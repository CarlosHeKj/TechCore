import { clerkMiddleware } from '@clerk/nextjs/server';
import {  NextResponse } from 'next/server';

export const config = {
  runtime: 'experimental-edge', // 'experimental-edge' para funções Edge
};

// Middleware para Edge Functions
export default clerkMiddleware((auth, request) => {
 
 
  return NextResponse.next();
});
