import {Store} from "@/types";
import {auth} from "@/auth";

export const getStoreNames = async (): Promise<Store[]> => {
    try {

        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/store/get/names`;
        const session = await auth();
        const token = session?.user.jwt;

        // Default options are marked with *
        const response = await fetch(url, {
            method: "GET", // Specify the method, GET in this case
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Include the JWT in the Authorization header
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