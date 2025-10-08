import { AppDataSource } from '../data-source';
import { Peca } from '../entities/Peca'; 

const pecaRepository = AppDataSource.getRepository(Peca);

export const getAllPecas = async (): Promise<Peca[]> => {
    return pecaRepository.find({ 
        relations: ['marca'], 
        order: { id: "DESC" } 
    });
};

export const getPecaById = async (id: number): Promise<Peca | null> => {
    return pecaRepository.findOne({ 
        where: { id },
        relations: ['marca'] 
    });
};

export const addPeca = async (novaPecaData: Partial<Peca>): Promise<Peca> => {
    const novaPeca = pecaRepository.create(novaPecaData);
    await pecaRepository.save(novaPeca);
    
    const pecaCriada = await getPecaById(novaPeca.id);
    if (!pecaCriada) throw new Error("Falha ao recuperar peça criada.");
    
    return pecaCriada;
};

export const updatePeca = async (id: number, updates: Partial<Peca>): Promise<Peca | undefined> => {
    const pecaExistente = await getPecaById(id); 
    if (!pecaExistente) {
        return undefined;
    }

    if (updates.status && updates.status !== pecaExistente.status) {
        updates.dataStatusAtual = new Date();
    }

    const pecaAtualizada = pecaRepository.merge(pecaExistente, updates);
    await pecaRepository.save(pecaAtualizada);
    
    return await getPecaById(id) as Peca;
};

export const deletePeca = async (id: number): Promise<boolean> => {
    const result = await pecaRepository.delete(id);
    return (result.affected ?? 0) > 0;
};