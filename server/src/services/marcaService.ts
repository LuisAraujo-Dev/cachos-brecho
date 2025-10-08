import { AppDataSource } from '../data-source';
import { Marca } from '../entities/Marca';
import { FindManyOptions } from 'typeorm';

const marcaRepository = AppDataSource.getRepository(Marca);

export const getAllMarcas = async (): Promise<Marca[]> => {
    const options: FindManyOptions<Marca> = {
        order: { nome: "ASC" }
    };
    return marcaRepository.find(options);
};

export const addMarca = async (nome: string): Promise<Marca> => {
    const novaMarca = marcaRepository.create({ nome });
    
    await marcaRepository.save(novaMarca);
    
    return novaMarca;
};