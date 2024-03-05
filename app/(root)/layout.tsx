import {redirect} from "next/navigation";

import React from "react";
import {getOldestStoreId} from "@/actions/store/get-oldest-store-id";


export default async function SetupLayout(
    {
        children
    }: {
        children: React.ReactNode;
    }) {

    const storeId = await getOldestStoreId();

    if (storeId != null) {
        redirect(`/${storeId}`);
    }

    return (
        <>
            {children}
        </>
    )
}