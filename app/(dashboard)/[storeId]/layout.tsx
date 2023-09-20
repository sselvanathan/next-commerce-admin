import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";

import prismadb from "@/lib/prismadb";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import React from "react";
import {Separator} from "@/components/ui/separator";

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
    const {userId} = auth();

    if (!userId) {
        redirect('/sign-in')
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