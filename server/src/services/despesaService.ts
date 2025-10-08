import { AppDataSource } from '../data-source';
import { Despesa } from '../entities/Despesa'; 
import { FindManyOptions } from 'typeorm';

const despesaRepository = AppDataSource.getRepository(Despesa);

// Função para buscar todas as despesas (RF.ADM.09)
export const getAllDespesas = async (): Promise<Despesa[]> => {
    const options: FindManyOptions<Despesa> = {
        order: { data: "DESC", id: "DESC" } // Ordena por data (mais recente primeiro)
    };
    return despesaRepository.find(options);
};

// Função para adicionar nova despesa (RF.ADM.09)
export const addDespesa = async (novaDespesaData: Omit<Despesa, 'id'>): Promise<Despesa> => {
    const novaDespesa = despesaRepository.create(novaDespesaData);
    await despesaRepository.save(novaDespesa);
    return novaDespesa;
};