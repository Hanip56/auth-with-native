/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
// export const publicRoutes = ["/masuk", "/daftar"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to '/'
 * @type {string[]}
 */
export const clientAuthRoutes = ["/login", "/register"];

/**
 * The prefix for API routes
 * Routes that start with this prefix are used for API purposes
 * @type {string}
 */
export const apiPrefix = "/api";

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after loggin in
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
