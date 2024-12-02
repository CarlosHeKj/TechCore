import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

// Define que a função será executada no Edge
export const config = {
  runtime: 'experimental-edge', // 'experimental-edge' para funções Edge
  publicRoutes: ['/', '/product/(.*)', '/sign-in(.*)', '/sign-up(.*)'],
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};

// Middleware com tipos explícitos para req e res
export default function middleware(props: any){
  // Chamando o Clerk Middleware diretamente e retornando o NextResponse
  return clerkMiddleware(props);
}
