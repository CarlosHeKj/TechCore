import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

// Configuração do Edge Runtime
export const config = {
  runtime: 'experimental-edge', // 'experimental-edge' para funções Edge
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)', // Incluir rotas da API
  ],
};

// Middleware para Edge Functions
export default clerkMiddleware(
  (auth, request, event) => {
    // Verifique se o usuário está autenticado usando 'auth.userId'
    

    // Se o usuário estiver autenticado, continua com o fluxo da requisição
    return NextResponse.next();
  },
  {
    // Aqui você pode passar as opções, se necessário
    // Exemplo de opções: publicRoutes, etc.
  }
);
