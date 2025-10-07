import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'API Cachos-Brechó funcionando! Versão 1.0.' });
});

app.listen(PORT, () => {
    console.log(`[Server] API rodando em http://localhost:${PORT}`);
});