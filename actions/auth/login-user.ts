export const loginUser = async (email: string, password: string) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`;
    console.log(process.env.NEXT_PUBLIC_BACKEND_URL)

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include', // Important to include credentials for cookies
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Login failed:', error);
        // Handle login error (show message to user, etc.)
    }
}
