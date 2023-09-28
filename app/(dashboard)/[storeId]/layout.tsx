import {redirect} from "next/navigation";

import prismadb from "@/lib/prismadb";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import React from "react";
import {Separator} from "@/components/ui/separator";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {NextResponse} from "next/server";

export default async function DashboardLayout(
    {
        children,
        params
    }: {
        children: React.ReactNode;
        params: {
            storeId: string
        }
    }) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
        return new NextResponse("Unauthenticated", { status: 401 });
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })

    if (!store) {
        redirect('/');
    }

    return (
        <>
            <Navbar/>
            <div className="flex">
                <Sidebar/>
                <Separator orientation="vertical"/>
                <div className="container mx-auto mt-12">
                    {children}
                </div>
            </div>
        </>
    )
}