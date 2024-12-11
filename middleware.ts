import { auth } from "@/auth";
import {
  apiAuthPrefix,
  apiPrefix,
  clientAuthRoutes,
  DEFAULT_LOGIN_REDIRECT,
} from "./routes";

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isClientAuthRoutes = clientAuthRoutes.includes(nextUrl.pathname);
  const isApiAuthRoutes = nextUrl.pathname.startsWith(apiAuthPrefix);

  if (isApiAuthRoutes) {
    return;
  }

  if (isClientAuthRoutes) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return;
  }

  // =========== logic for login with token
  const isApiRoutes = nextUrl.pathname.startsWith(apiPrefix);

  // if it's an /api routes & has no auth in next-auth (which mean it's fired outside nextjs app eg. native/mobile)
  if (isApiRoutes && !isLoggedIn) {
    const headToken = req.headers.get("Authorization");

    if (headToken && headToken.startsWith("Bearer")) {
      const token = headToken.split(" ")[1];

      const userExist = await fetch(
        `${nextUrl.origin}/api/auth/check-jwt?token=${token}`
      );

      if (userExist.status !== 200) {
        return Response.json("Unathorized", { status: 401 });
      }

      return;
    }
  }

  if (!isLoggedIn) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  // check if user exist in DB every api request
  if (nextUrl.pathname !== "/logout") {
    const checkUserResponse = await fetch(
      `${nextUrl.origin}/api/auth/check?id=${req.auth?.user.id}`
    );

    if (checkUserResponse.status === 404) {
      return Response.redirect(new URL("/logout", nextUrl));
    }
  }

  return;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
