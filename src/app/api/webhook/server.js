const express = require('express');
const bodyParser = require('body-parser');
const { Clerk } = require('@clerk/clerk-sdk-node');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

dotenv.config();  // Carrega as variáveis do arquivo .env

const app = express();
const prisma = new PrismaClient();
const clerk = new Clerk({ apiKey: process.env.CLERK_API_KEY });

// Middleware para analisar o corpo das requisições como JSON
app.use(bodyParser.json());

// Endpoint do Webhook
app.post('/webhook', async (req, res) => {
  const { type, data } = req.body;

  // (Opcional) Verificar a assinatura do Clerk se necessário
   const signature = req.headers['clerk-signature'];
   const isValidSignature = clerk.webhooks.verifySignature(req.body, signature);
   if (!isValidSignature) {
     return res.status(400).send('Invalid signature');
   }

  // Lógica de processamento conforme o tipo de evento
  if (type === 'user.created') {
    const { userId, email } = data;

    // Criação do usuário no banco de dados SQLite
    await prisma.user.create({
      data: {
        id: userId,
        email: email,
      },
    });

    console.log('User created in SQLite:', userId);
  }

  // Enviar resposta de sucesso
  res.status(200).send('Webhook received');
});

// Iniciar o servidor Express
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
