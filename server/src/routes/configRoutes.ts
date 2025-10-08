import { Router } from 'express';
import { getConfig, updateConfig } from '../services/configService';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const config = await getConfig();
        res.status(200).json(config);
    } catch (error) {
        console.error('Erro ao buscar configurações:', error);
        res.status(500).json({ error: 'Falha ao buscar configurações globais.' });
    }
});

router.patch('/', async (req, res) => {
    const updates = req.body;
    try {
        const config = await updateConfig(updates);
        res.status(200).json(config);
    } catch (error) {
        console.error('Erro ao atualizar configurações:', error);
        res.status(500).json({ error: 'Falha ao atualizar configurações globais.' });
    }
});

export default router;