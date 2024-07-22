import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server';
 
export function middleware(request) {
    const path = request.nextUrl.pathname;
    const publicPaths = ["/auth/login", "/auth/login/password/reset", "/auth/register"]
    let isPublicPath = false;
    publicPaths.map((p) => {
        if (path === p) {
            isPublicPath = true
        }
    })
    const cookie = request.cookies.get('token');
    const isTokenExpired = !cookie || !cookie?.expiresAt || new Date() > new Date(cookie.expiresAt * 1000)

    if (cookie?.length>0 && isPublicPath) {
        return NextResponse.redirect(new URL('/profile', request.nextUrl));
    }

    if (!cookie && !isPublicPath) {
        return NextResponse.redirect(new URL('/auth/login', request.nextUrl));
    }

}


export const config = {
  matcher: ['/profile','/auth/login'],
}