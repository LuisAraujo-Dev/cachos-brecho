// src/services/pecaService.ts
import { AppDataSource } from '../data-source';
import { Peca } from '../entities/Peca'; 

const pecaRepository = AppDataSource.getRepository(Peca);

export const getAllPecas = async (): Promise<Peca[]> => {
    return pecaRepository.find({ order: { id: "DESC" } });
};

export const addPeca = async (novaPecaData: Partial<Peca>): Promise<Peca> => {
    const novaPeca = pecaRepository.create(novaPecaData);
    await pecaRepository.save(novaPeca);
    return novaPeca;
};

export const updatePeca = async (id: number, updates: Partial<Peca>): Promise<Peca | undefined> => {
    const pecaExistente = await pecaRepository.findOneBy({ id });

    if (!pecaExistente) {
        return undefined;
    }

    if (updates.status && updates.status !== pecaExistente.status) {
        updates.dataStatusAtual = new Date();
    }

    const pecaAtualizada = pecaRepository.merge(pecaExistente, updates);
    await pecaRepository.save(pecaAtualizada);
    
    return pecaAtualizada;
};
