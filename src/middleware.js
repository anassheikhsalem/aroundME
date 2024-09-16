import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const config = {
  matcher: ['/profile', '/auth/(.*)', '/admin/(.*)'],
};

export default async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Public paths that do not require authentication
  const publicPaths = [
    "/auth/login", 
    "/auth/register", 
    "/auth/login/verifying/account",
    "/auth/login/password/new",
    "/auth/login/password/reset", 
    "/auth/register/terms-and-conditions"
  ];

  const isPublicPath = publicPaths.includes(pathname);

  // If the user is trying to access a public path and is authenticated, redirect them away
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', req.url)); // Redirect to homepage or any other page
  }

  // If the user is trying to access an auth-protected page without a token, redirect them to login
  if (!isPublicPath && pathname.startsWith('/auth') && !token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // Admin pages: Accessible only to authenticated users with an admin role
  if (pathname.startsWith('/admin')) {
    if (!token || token.role !== 'admin') {
      // Redirect to unauthorized page if not authenticated or not an admin
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  // Protected pages: Accessible only to authenticated users
  if (pathname.startsWith('/profile') && !token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // Allow access to the requested resource
  return NextResponse.next();
}
