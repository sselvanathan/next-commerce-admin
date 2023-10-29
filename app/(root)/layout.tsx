import {redirect} from "next/navigation";

import React from "react";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {getOldestStoreId} from "@/actions/store/get-oldest-store-id";
import {NextResponse} from "next/server";

export default async function SetupLayout(
    {
        children
    }: {
        children: React.ReactNode;
    }) {
    const session = await getServerSession(authOptions);
    const token = session?.user?.token;

    if (!token) {
        return new NextResponse("Unauthenticated", {status: 401});
    }

    const storeId = await getOldestStoreId(token);

    if (storeId) {
        redirect(`/${storeId}`);
    }

    return (
        <>
            {children}
        </>
    )
}