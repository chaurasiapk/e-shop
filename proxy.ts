import { NextResponse, type NextRequest } from "next/server";
import { AUTH_SESSION_COOKIE } from "@/utils/contants";

export function proxy(request: NextRequest) {
  const sessionToken = request.cookies.get(AUTH_SESSION_COOKIE)?.value;

  if (sessionToken) return NextResponse.next();

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set(
    "next",
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
  );

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/profile","/profile/:path*"],
};
