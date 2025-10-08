import { AppDataSource } from '../data-source';
import { Evento } from '../entities/Evento';
import { FindManyOptions } from 'typeorm';

const eventoRepository = AppDataSource.getRepository(Evento);

export const getAllEventos = async (): Promise<Evento[]> => {
    const options: FindManyOptions<Evento> = {
        order: { data: "ASC" } 
    };
    return eventoRepository.find(options);
};

// RF.ADM.17: Cadastrar um novo evento
export const addEvento = async (novoEventoData: Omit<Evento, 'id'>): Promise<Evento> => {
    const novoEvento = eventoRepository.create(novoEventoData);
    await eventoRepository.save(novoEvento);
    return novoEvento;
};