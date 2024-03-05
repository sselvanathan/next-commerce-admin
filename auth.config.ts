import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "@auth/core/providers/credentials";
import {JWT} from "next-auth/jwt";

interface MyToken extends JWT {
    jwt?: string;
}

export default {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "max@gmail.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password,
                    }),
                });

                const user = await res.json();

                // If no error and we have user data, return it
                if (res.ok && user) {
                    return user;
                }
                // Return null if user data could not be retrieved
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // Cast the token to MyToken type
            const myToken = token as MyToken;
            if (user) {
                myToken.jwt = user.jwt; // Assuming 'user.id' is a string
            }
            return myToken;
        },
        async session({ session, token }) {
            // Cast the token to MyToken type
            const myToken = token as MyToken;
            if (session.user && myToken.jwt) {
                session.user.jwt = myToken.jwt;
            }
            return session;
        },
    },
} satisfies NextAuthConfig