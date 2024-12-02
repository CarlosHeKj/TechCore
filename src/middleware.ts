import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export const config = {
  publicRoutes: ['/'],
   
  matcher: ['/api/(.*)', '/product/(.*)'],
};


export function middleware(req: Request) {
  try {
    console.log('Middleware executado');
    return NextResponse.next();
  } catch (error) {
    console.error('Erro no Middleware:', error);
    return NextResponse.error();
  }
}
