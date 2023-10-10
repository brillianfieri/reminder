import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(req => {
  const path = req.nextUrl.pathname;
  if(path === "/admin"){
    if (req.nextauth.token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/user/account', req.url));
    }
  }
  
});

export const config = {
  matcher: ['/','/index', '/admin']
};