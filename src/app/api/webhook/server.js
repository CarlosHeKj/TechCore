const express = require('express');
const { Client } = require('neon');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configuração do NeonDB
const client = new Client({
  host: 'ep-late-lake-a4r3o85y-pooler.us-east-1.aws.neon.tech',
  user: 'neondb_owner',
  password: 'spZUz1cldy9F',
  database: 'neondb',
});

client.connect();

// Middleware para parsing do corpo da requisição (necessário para webhooks)
app.use(bodyParser.json());

// Endpoint para receber os webhooks do Clerk
app.post('/webhook/clerk', async (req, res) => {
  const event = req.body; // Dados do evento enviado pelo Clerk

  // Exemplo de como você pode salvar os dados no NeonDB
  try {
    if (event.type === 'user.created') {
      const userData = event.data;
      await client.query(`
        INSERT INTO users (id, email, created_at)
        VALUES ($1, $2, $3)`,
        [userData.id, userData.email, userData.created_at]
      );
    }

    res.status(200).send('Event received');
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
