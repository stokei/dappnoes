import { getCookie, setCookie } from '.';

const LAST_PATHNAME_AUTHENTICATED_KEY = 'last-pathname-authenticated';
export const setLastPathnameAuthenticated = (pathname: string) => setCookie(LAST_PATHNAME_AUTHENTICATED_KEY, pathname);
export const getLastPathnameAuthenticated = () => getCookie(LAST_PATHNAME_AUTHENTICATED_KEY);
