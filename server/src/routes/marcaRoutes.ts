// src/routes/marcaRoutes.ts
import { Router } from 'express';
import { getAllMarcas, addMarca } from '../services/marcaService';

const router = Router();

router.get('/', async (req, res) => { 
    try {
        const listaMarcas = await getAllMarcas();
        res.status(200).json(listaMarcas);
    } catch (error) {
        console.error('Erro ao buscar marcas:', error);
        res.status(500).json({ error: 'Falha ao carregar a lista de marcas.' });
    }
});

router.post('/', async (req, res) => { 
    const { nome } = req.body;
    
    if (!nome) {
        return res.status(400).json({ error: 'O nome da marca é obrigatório.' });
    }

    try {
        const novaMarca = await addMarca(nome); // Usa await
        res.status(201).json(novaMarca);
    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ error: 'Erro ao adicionar marca. Verifique se a marca já existe.' }); 
    }
});

export default router;