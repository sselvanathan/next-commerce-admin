import {redirect} from "next/navigation";
import {cookies} from 'next/headers'

import React from "react";
import {getOldestStoreId} from "@/actions/store/get-oldest-store-id";

export default async function SetupLayout(
    {
        children
    }: {
        children: React.ReactNode;
    }) {

    //const cookie = cookies().get('jwt');
    const cookie = cookies().toString();
    const storeId = await getOldestStoreId(cookie);

    if (storeId != null) {
        redirect(`/${storeId}`);
    }

    return (
        <>
            {children}
        </>
    )
}