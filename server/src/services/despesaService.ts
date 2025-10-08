// src/services/despesaService.ts

export type CategoriaDespesa = 'Limpeza' | 'Reparo' | 'Envio' | 'Embalagem' | 'Marketing' | 'Fixo' | 'Outros';

export interface Despesa {
    id: number;
    data: string; // YYYY-MM-DD
    valor: number;
    descricao: string;
    categoria: CategoriaDespesa;
}
// eslint-disable-next-line
let despesas: Despesa[] = [
    { id: 1, data: '2025-10-01', valor: 15.50, descricao: 'Sabão e amaciante', categoria: 'Limpeza' },
    { id: 2, data: '2025-10-05', valor: 30.00, descricao: 'Etiquetas de envio', categoria: 'Embalagem' },
];
let nextDespesaId = 3;

export const getAllDespesas = (): Despesa[] => {
    return despesas;
};

export const addDespesa = (novaDespesaData: Omit<Despesa, 'id'>): Despesa => {
    const novaDespesa: Despesa = {
        id: nextDespesaId++,
        ...novaDespesaData,
    };
    despesas.push(novaDespesa);
    return novaDespesa;
};