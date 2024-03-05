import {auth} from "@/auth";

export const getOldestStoreId = async () => {
    try {
        const session = await auth();
        const token = session?.user.jwt;

        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/store/get/oldest/id`;
        const response = await fetch(url, {
            method: "GET", // Specify the method, GET in this case
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Include the JWT in the Authorization header
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const jsonResponse = await response.json();
        return jsonResponse.storeId; // Assuming the response JSON contains a storeId field
    } catch (error) {
        console.error("Error fetching the oldest store ID:", error);
        throw error; // Rethrow the error for further handling
    }
}
