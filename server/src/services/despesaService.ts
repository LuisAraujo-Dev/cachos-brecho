import { AppDataSource } from '../data-source';
import { Despesa } from '../entities/Despesa'; 
import { FindManyOptions } from 'typeorm';

const despesaRepository = AppDataSource.getRepository(Despesa);

export const getAllDespesas = async (): Promise<Despesa[]> => {
    const options: FindManyOptions<Despesa> = {
        order: { data: "DESC", id: "DESC" }
    };
    return despesaRepository.find(options);
};

export const addDespesa = async (novaDespesaData: Omit<Despesa, 'id'>): Promise<Despesa> => {
    const novaDespesa = despesaRepository.create(novaDespesaData);
    await despesaRepository.save(novaDespesa);
    return novaDespesa;
};

export const deleteDespesa = async (id: number): Promise<boolean> => {
    const result = await despesaRepository.delete(id);
    return result.affected !== undefined && result.affected !== null && result.affected > 0;
}