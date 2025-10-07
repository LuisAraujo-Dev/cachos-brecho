// src/server.ts
import express from 'express';
import marcaRoutes from './routes/marcaRoutes'; // 1. Importa a nova rota

const app = express();
const PORT = 3000;

app.use(express.json());

// Rota de Teste Simples
app.get('/', (req, res) => {
    res.status(200).json({ message: 'API Cachos-Brechó funcionando! Versão 1.0.' });
});

// 2. Adiciona as rotas de atributos
app.use('/api/marcas', marcaRoutes); 

// Inicialização do Servidor
app.listen(PORT, () => {
    console.log(`[Server] API rodando em http://localhost:${PORT}`);
    console.log(`[Marcas] Teste GET: http://localhost:${PORT}/api/marcas`);
});