import {Store} from "@/types";

export const getStoreNames = async (cookie: string): Promise<Store[]> => {
    try {

        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/store/get/names`;
        // Default options are marked with *
        const response = await fetch(url, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "include", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookie
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            //body: JSON.stringify(data), // body data type must match "Content-Type" header
        });

        const jsonResponse = await response.json();

        // Convert the nested arrays to objects of type Store
        return jsonResponse.stores.map(([id, name]: [number, string]): Store => {
            return {id: id.toString(), name};
        })
    } catch (error) {
        throw error;
    }
}