import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
})
export const getToken = (cookies: { jwt: any; }) => {
    // Extract and return the JWT token from the cookies
    // Replace 'jwt' with your cookie name
    return cookies.jwt || null;
};
