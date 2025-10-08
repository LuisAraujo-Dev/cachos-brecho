import { Router } from 'express';
import { getAllPecas, getPecaById, addPeca, updatePeca, deletePeca } from '../services/pecaService';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const pecas = await getAllPecas();
        res.status(200).json(pecas);
    } catch (error) {
        console.error('Erro ao buscar peças:', error);
        res.status(500).json({ error: 'Falha ao carregar o inventário.' });
    }
});

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });
    
    try {
        const peca = await getPecaById(id);
        if (peca) {
            res.status(200).json(peca);
        } else {
            res.status(404).json({ error: 'Peça não encontrada.' });
        }
    } catch (error) {
        console.error('Erro ao buscar peça:', error);
        res.status(500).json({ error: 'Erro interno ao buscar peça.' });
    }
});

router.post('/', async (req, res) => {
    const novaPecaData = req.body;
    if (!novaPecaData.nome || !novaPecaData.marcaId || !novaPecaData.status) {
        return res.status(400).json({ error: 'Nome, Marca e Status são obrigatórios.' });
    }

    try {
        const novaPeca = await addPeca(novaPecaData);
        res.status(201).json(novaPeca);
    } catch (error) {
        console.error('Erro ao adicionar peça:', error);
        res.status(500).json({ error: 'Falha ao registrar a peça.' }); 
    }
});

router.patch('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });
    
    const updates = req.body;

    try {
        const pecaAtualizada = await updatePeca(id, updates);
        
        if (pecaAtualizada) {
            res.status(200).json(pecaAtualizada);
        } else {
            res.status(404).json({ error: 'Peça não encontrada.' });
        }
    } catch (error) {
        console.error('Erro ao atualizar peça:', error);
        res.status(500).json({ error: 'Falha ao atualizar a peça.' });
    }
});

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });
    
    try {
        const deleted = await deletePeca(id);
        
        if (deleted) {
            return res.status(200).json({ message: 'Peça excluída com sucesso.' });
        } else {
            return res.status(404).json({ error: 'Peça não encontrada.' });
        }
    } catch (error) {
        console.error('Erro ao excluir peça:', error);
        res.status(500).json({ error: 'Erro interno ao excluir peça.' });
    }
});

export default router;