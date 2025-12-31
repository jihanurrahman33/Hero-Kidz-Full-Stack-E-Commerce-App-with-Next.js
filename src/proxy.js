import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
const privateRoute = ["/dashboard", "/profile", "/cart", "/checkout"];
export async function proxy(req) {
  const token = await getToken({ req });
  const isAuthenticated = Boolean(token);
  const reqPath = req.nextUrl.pathname;
  const isPrivateReq = privateRoute.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );
  if (!isAuthenticated && isPrivateReq) {
    const callbackUrl = req.nextUrl.pathname;
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, req.url)
    );
  }

  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/cart/:path*",
    "/checkout/:path*",
  ],
};
