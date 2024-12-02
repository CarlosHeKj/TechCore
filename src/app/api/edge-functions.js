// pages/api/edge-function.js

export const config = {
    runtime: 'edge',  // Define a execução no ambiente Edge
};

export default async function handler(req) {
    // Pode acessar o método e outros dados da requisição
    const { method } = req;

    if (method === 'GET') {
        // Lógica para a requisição GET
        return new Response('GET request to Edge function');
    }

    if (method === 'POST') {
        // Lógica para a requisição POST
        const requestData = await req.json();
        return new Response(`Received POST request with data: ${JSON.stringify(requestData)}`);
    }

    // Para outros métodos
    return new Response('Method not allowed', { status: 405 });
}
