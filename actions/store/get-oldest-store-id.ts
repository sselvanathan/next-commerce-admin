import axios from "axios";

export const getOldestStoreId = async (token: string) => {
    try {
        const response = await axios.post(`${process.env.BACKEND_URL}/api/v1/store/oldest`,
            {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
        return response.data;
    } catch (error) {
        throw error;
    }
}