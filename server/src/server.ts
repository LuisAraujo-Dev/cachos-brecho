import express from 'express';
import marcaRoutes from './routes/marcaRoutes'; 
import pecaRoutes from './routes/pecaRoutes';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'API Cachos-Brechó funcionando! Versão 1.0.' });
});

app.use('/api/marcas', marcaRoutes); 

app.use('/api/pecas', pecaRoutes);

app.listen(PORT, () => {
    console.log(`[Server] API rodando em http://localhost:${PORT}`);
    console.log(`[Marcas] Teste GET: http://localhost:${PORT}/api/marcas`);
    console.log(`[Pecas] Teste GET: http://localhost:${PORT}/api/pecas`);
});