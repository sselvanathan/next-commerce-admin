'use server'

import {auth} from "@/auth";

export const createStore = async (storeName: string) => {

    try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/store/create`;
        const session = await auth();
        const token = session?.user.jwt;

        //const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/store/debug/cookies`;

        // Default options are marked with *
        const response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "include", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Include the JWT in the Authorization header
            },
            //body: {
                //name: storeName,
            //},
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            //body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        const jsonResponse = await response.json();
        return jsonResponse.storeId; // Assuming the response JSON contains a storeId field

    } catch (error) {
        throw error;
    }
}