// src/routes/marcaRoutes.ts
import { Router } from 'express';
import { getAllMarcas, addMarca } from '../services/marcaService';

const router = Router();

router.get('/', (req, res) => {
    const listaMarcas = getAllMarcas();
    res.status(200).json(listaMarcas);
});

router.post('/', (req, res) => {
    const { nome } = req.body;
    
    if (!nome) {
        return res.status(400).json({ error: 'O nome da marca é obrigatório.' });
    }

    try {
        const novaMarca = addMarca(nome);
        res.status(201).json(novaMarca);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar marca.' });
    }
});

export default router;