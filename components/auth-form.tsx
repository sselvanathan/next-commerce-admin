"use client"

import * as React from "react"

import {cn} from "@/lib/utils"
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Github} from "lucide-react";
import {useRef} from "react";
import {loginUser} from "@/actions/auth/login-user";
import Router from "next/router";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function UserAuthForm({className, ...props}: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const email = emailRef.current?.value || "";
        const password = passwordRef.current?.value || "";

        try {
            await signIn("credentials", {
                email:email,
                password:password,
                redirect:true,
            callbackUrl: "/"
            })

        } catch (error) {
            console.error('Login failed:', error);
            // Handle login error
        }
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Input
                            id="email"
                            name="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            defaultValue=""
                            ref={emailRef}
                        />
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="password"
                            placeholder="password"
                            type="password"
                            name="password"
                            autoCapitalize="none"
                            autoComplete="false"
                            autoCorrect="off"
                            defaultValue=""
                            ref={passwordRef}
                        />
                    </div>
                    <Button disabled={isLoading}>
                        Sign In with Email
                    </Button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"/>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
                </div>
            </div>
            <Button variant="outline" type="button" disabled={isLoading}>
                <Github className="mr-2 h-4 w-4"/>
                Github
            </Button>
        </div>
    )
}