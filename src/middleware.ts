import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token");
  const { pathname } = request.nextUrl;

  if (accessToken && (pathname === "/signin" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!accessToken && pathname.startsWith("/protected")) {
    const url = new URL("/signin", request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/signup"],
};
