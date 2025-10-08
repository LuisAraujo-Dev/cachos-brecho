import { Router } from 'express';
import { getAllEventos, addEvento } from '../services/eventoService';

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json(getAllEventos());
});

router.post('/', (req, res) => {
    const novoEventoData = req.body; 

    if (!novoEventoData.nome || !novoEventoData.data) {
        return res.status(400).json({ error: 'Nome e Data do evento são obrigatórios.' });
    }

    try {
        const novoEvento = addEvento(novoEventoData);
        res.status(201).json(novoEvento);
    } catch (error) {
        console.error('Erro ao adicionar novo evento:', error);
        res.status(500).json({ error: 'Erro interno ao cadastrar evento.' });
    }
});

export default router;