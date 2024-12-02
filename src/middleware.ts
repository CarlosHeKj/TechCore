import { clerkMiddleware } from "@clerk/nextjs/server";

// Define que a função será executada no Edge
export const config = {
  runtime: 'edge',  // Essencial para funções Edge
  publicRoutes: ['/', '/product/(.*)', '/sign-in(.*)', '/sign-up(.*)'],
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

export default clerkMiddleware();
