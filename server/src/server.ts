import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import marcaRoutes from './routes/marcaRoutes'; 
import pecaRoutes from './routes/pecaRoutes';
import eventoRoutes from './routes/eventoRoutes';
import despesaRoutes from './routes/despesaRoutes';
import configRoutes from './routes/configRoutes';

const app = express();
const PORT = 3000;

AppDataSource.initialize()
    .then(() => {
        console.log("[DB] Conexão com PostgreSQL estabelecida com sucesso.");

        app.use(cors({
            origin: 'http://localhost:5173', 
            methods: ['GET', 'POST', 'PATCH', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        }));

        app.use(express.json());

        app.get('/', (req, res) => {
            res.status(200).json({ message: 'API Cachos-Brechó funcionando! Versão 1.0.' });
        });

        app.use('/api/marcas', marcaRoutes); 
        app.use('/api/pecas', pecaRoutes);
        app.use('/api/eventos', eventoRoutes);
        app.use('/api/despesas', despesaRoutes); 
        app.use('/api/config', configRoutes);
        
        app.listen(PORT, () => {
            console.log(`[Server] API rodando em http://localhost:${PORT}`);
        });

    })
    .catch((error) => console.error("[DB ERROR] Falha ao inicializar o banco de dados:", error));