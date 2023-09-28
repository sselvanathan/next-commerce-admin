import {redirect} from "next/navigation";

import prismadb from "@/lib/prismadb";
import React from "react";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {NextResponse} from "next/server";

export default async function SetupLayout(
    {
        children
    }: {
        children: React.ReactNode;
    }) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
        return new NextResponse("Unauthenticated", { status: 401 });
    }

    const store = await prismadb.store.findFirst({
        where: {
            userId
        }
    });
    if (store) {
        redirect(`/${store.id}`)
    }

    return (
        <>
            {children}
        </>
    )
}