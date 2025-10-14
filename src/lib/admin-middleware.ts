import { NextRequest, NextResponse } from 'next/server';

// Simple admin middleware - you can enhance with real authentication
export function adminMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if path is admin route
  if (pathname.includes('/admin')) {
    // For now, just allow access - you can add authentication logic here
    // Example: check for admin token in cookies or headers
    
    // const token = request.cookies.get('admin-token');
    // if (!token) {
    //   return NextResponse.redirect(new URL('/login', request.url));
    // }
    
    return NextResponse.next();
  }
  
  return NextResponse.next();
}