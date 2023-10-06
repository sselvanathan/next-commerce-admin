"use client";

import {Plus} from "lucide-react";
import {useParams, useRouter} from "next/navigation";
import React from "react";

import {Heading} from "@/components/ui/heading";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {LayoutColumn, columns} from "@/app/(dashboard)/[storeId]/(routes)/layouts/components/columns";
import {DataTable} from "@/components/ui/data-table";

interface LayoutClientProps {
    data: LayoutColumn[]
}

export const LayoutClient: React.FC<LayoutClientProps> = (
    {
        data
    }) => {
    const router = useRouter();
    const params = useParams();
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Layouts (${data.length})`}
                    description="Manage layouts for your store"
                />
                <Button onClick={() => router.push(`/${params.storeId}/layouts/new`)}>
                    <Plus className="mr-2 h-4 w-4"/>
                    Add New
                </Button>
            </div>
            <Separator/>
            <DataTable columns={columns} data={data} searchKey="name" />
        </>
    )
}