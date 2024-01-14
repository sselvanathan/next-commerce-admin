// authMiddleware.ts

import { parseCookies } from 'nookies';
import Cookies from 'js-cookie';

export const checkAuth = (ctx?: any): boolean => {
    const jwt = ctx ? parseCookies(ctx)['jwt'] : Cookies.get('jwt'); // Replace 'jwt' with your cookie name
    console.log(Boolean(jwt));
    return Boolean(jwt);
};
