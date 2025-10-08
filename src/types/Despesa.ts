export type CategoriaDespesa = 'Limpeza' | 'Reparo' | 'Envio' | 'Embalagem' | 'Marketing' | 'Fixo' | 'Outros';

export interface Despesa {
    id: number;
    data: string;
    valor: number;
    descricao: string;
    categoria: CategoriaDespesa;
}

export interface DespesaForm {
    data: string;
    valor: number | '';
    descricao: string;
    categoria: CategoriaDespesa | '';
}