const { Client } = require('pg');

// Defina os parâmetros de conexão com o banco de dados
const client = new Client({
  host: 'ep-late-lake-a4r3o85y-pooler.us-east-1.aws.neon.tech', // Host do NeonDB
  user: 'neondb_owner', // Usuário do NeonDB
  password: 'spZUz1cldy9F', // Senha do NeonDB
  database: 'neondb', // Nome do banco de dados
  ssl: { rejectUnauthorized: false } // Defina o SSL, se necessário
});

// Tente se conectar ao banco de dados
async function testConnection() {
  try {
    // Conectar ao banco de dados
    await client.connect();
    console.log('Conexão bem-sucedida ao NeonDB!');
  } catch (err) {
    console.error('Erro ao conectar ao NeonDB:', err);
  } finally {
    // Fechar a conexão
    await client.end();
  }
}

// Chama a função para testar a conexão
testConnection();
