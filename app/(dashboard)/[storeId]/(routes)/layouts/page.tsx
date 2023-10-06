import React from "react";
import prismadb from "@/lib/prismadb";

import {LayoutClient} from "@/app/(dashboard)/[storeId]/(routes)/layouts/components/client";
import {LayoutColumn} from "@/app/(dashboard)/[storeId]/(routes)/layouts/components/columns";
import {format} from "date-fns";

interface LayoutsPageProps {
    params: {
        storeId: string
    }
}

const LayoutsPage: React.FC<LayoutsPageProps> = async ({params}) => {

    const layouts = await prismadb.layout.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedLayouts: LayoutColumn[] = layouts.map((item) => (
        {
            id: item.id,
            name: item.name,
            isArchived: item.isArchived,
            createdAt: format(item.createdAt, "MMMM do, yyyy")
        }
    ))

    return (
        <>
            <div className="flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <LayoutClient data={formattedLayouts}/>
                </div>
            </div>
        </>

    );
}

export default LayoutsPage;