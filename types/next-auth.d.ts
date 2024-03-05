// types/next-auth.d.ts
import 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            // Include all existing user properties
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;

            // Add your custom property
            jwt?: string; // Make it optional to ensure compatibility with the base type
        }
    }
    interface User {
        jwt?: string; // Add your custom fields here
    }
}
