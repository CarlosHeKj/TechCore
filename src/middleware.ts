import { clerkMiddleware } from "@clerk/nextjs/server";

// Define que a função será executada no Edge
export const config = {
  runtime: 'experimental-edge',  // Use 'experimental-edge' para o runtime de funções Edge
  publicRoutes: ['/', '/product/(.*)', '/sign-in(.*)', '/sign-up(.*)'],
  matcher: [
    // Ignorar internals do Next.js e arquivos estáticos
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Sempre executar para rotas da API
    '/(api|trpc)(.*)',
  ],
};

export default clerkMiddleware();
