import { Router } from 'express';
import { getAllDespesas, addDespesa, deleteDespesa } from '../services/despesaService';

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json(getAllDespesas());
});

router.post('/', (req, res) => {
    const novaDespesaData = req.body; 
    
    if (!novaDespesaData.valor || !novaDespesaData.categoria) {
        return res.status(400).json({ error: 'Valor e Categoria da despesa são obrigatórios.' });
    }

    try {
        const novaDespesa = addDespesa(novaDespesaData);
        res.status(201).json(novaDespesa);
    } catch (error) {
        console.error('Erro ao adicionar nova despesa:', error);
        res.status(500).json({ error: 'Erro interno ao cadastrar despesa.' });
    }
});

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID da despesa inválido.' });
    }

    try {
        const deleted = await deleteDespesa(id);
        
        if (deleted) {
            return res.status(200).json({ message: 'Despesa excluída com sucesso.' });
        } else {
            return res.status(404).json({ error: 'Despesa não encontrada.' });
        }
    } catch (error) {
        console.error('Erro ao excluir despesa:', error);
        res.status(500).json({ error: 'Erro interno ao excluir despesa.' });
    }
});

export default router;