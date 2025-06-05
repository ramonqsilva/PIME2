require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { Client } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Permitir requisições apenas do seu frontend no GitHub Pages
app.use(cors({
    origin: 'https://ramonqsilva.github.io'
}));

app.use(express.json());

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

client.connect()
    .then(() => console.log('Conectado ao PostgreSQL'))
    .catch(err => console.error('Erro ao conectar no PostgreSQL:', err));

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const query = 'SELECT * FROM usuarios WHERE username = $1';
        const result = await client.query(query, [username]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Usuário ou senha inválidos!' });
        }

        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: 'Usuário ou senha inválidos!' });
        }

        return res.status(200).json({
            role: user.role,
            message: 'Login bem-sucedido!'
        });
    } catch (err) {
        console.error('Erro ao processar login:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente mais tarde.' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
