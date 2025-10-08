import { Router } from 'express';
import { getAllDespesas, addDespesa } from '../services/despesaService';

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

export default router;