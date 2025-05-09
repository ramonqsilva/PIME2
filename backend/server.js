require('dotenv').config();  // Para carregar as variáveis de ambiente do arquivo .env
const express = require('express');
const { Client } = require('pg');  // Para conectar ao PostgreSQL
const app = express();
const port = process.env.PORT || 3000;  // Porta do servidor

// Middleware para permitir receber JSON no corpo da requisição
app.use(express.json());

// Configuração do cliente PostgreSQL
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false  // Necessário para a conexão com o Railway
    }
});

// Conectar ao banco de dados PostgreSQL
client.connect()
    .then(() => console.log('Conectado ao banco de dados PostgreSQL'))
    .catch((err) => console.error('Erro ao conectar ao banco de dados:', err));

// Rota de login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Verifique se os dados de login são válidos
    const query = 'SELECT * FROM usuarios WHERE username = $1 AND password = $2';  // Substitua "usuarios" pela sua tabela
    try {
        const result = await client.query(query, [username, password]);

        if (result.rows.length > 0) {
            // Se encontrar o usuário, retorne o tipo de usuário (role)
            const user = result.rows[0];
            res.status(200).json({
                role: user.role,  // Ou qualquer outro campo que identifique o tipo de usuário
                message: 'Login bem-sucedido!'
            });
        } else {
            res.status(401).json({ message: 'Usuário ou senha inválidos!' });
        }
    } catch (err) {
        console.error('Erro ao verificar login:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente mais tarde.' });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
