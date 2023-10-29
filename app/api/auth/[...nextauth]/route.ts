import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import {NextAuthOptions, User} from "next-auth";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        session: ({session, token}) => {
            console.log('Session Callback', {session, token});
            return {
                ...session,
                user: {
                    ...session.user,
                    token: token.token
                }
            };
        },
        jwt: ({token, user}) => {
            console.log('JWT Callback', {user});
            if (user) {
                const u = user as unknown as any
                return {
                    id: u.id,
                    token: user.token
                }
            }

            return token;
        }
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                email: {
                    label: "Username",
                    type: "text",
                    placeholder: "swoosh",
                },
                password: {label: "Password", type: "password"},
            },

            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) return null;

                try {
                    const userResponse = await axios.post(`${process.env.BACKEND_URL}/api/v1/auth/authenticate`, {
                            'email': credentials?.email,
                            'password': credentials?.password,
                        },
                    );
                    console.log(userResponse);
                    const user: User = {
                        id: '1',
                        token: userResponse.data.token,
                    };
                    return user;
                } catch (e) {
                    console.error(e);
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/signIn",
    },
}

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};
