import {redirect} from "next/navigation";

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