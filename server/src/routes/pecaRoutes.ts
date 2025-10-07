// src/routes/pecaRoutes.ts
import { Router } from 'express';
import { addPeca, getAllPecas, updatePeca } from '../services/pecaService';

const router = Router();

router.get('/', (req, res) => {
    const listaPecas = getAllPecas();
    res.status(200).json(listaPecas);
});

router.post('/', (req, res) => {
    const novaPecaData = req.body; 

    if (!novaPecaData.nome || !novaPecaData.precoVenda) {
        return res.status(400).json({ error: 'Nome e Preço de Venda são obrigatórios.' });
    }

    try {
        const novaPeca = addPeca(novaPecaData);
        res.status(201).json(novaPeca);
    } catch (error) {
        console.error('Erro ao adicionar nova peça:', error);
        res.status(500).json({ error: 'Erro interno ao cadastrar a peça.' });
    }
});

router.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const updates = req.body;

    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID da peça inválido.' });
    }

    try {
        const pecaAtualizada = updatePeca(id, updates);

        if (!pecaAtualizada) {
            return res.status(404).json({ error: 'Peça não encontrada.' });
        }
        res.status(200).json(pecaAtualizada);
    } catch (error) {
        console.error(`Erro ao atualizar peça ${id}:`, error);
        res.status(500).json({ error: 'Erro interno ao atualizar a peça.' });
    }
});

export default router;