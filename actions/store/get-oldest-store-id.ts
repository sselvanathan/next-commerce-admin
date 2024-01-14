
export const getOldestStoreId = async (cookie: any) => {
    try {

        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/store/get/oldest/id`;
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

        // Extracting storeId from the JSON response
        return jsonResponse.storeId;
    } catch (error) {
        throw error;
    }
}