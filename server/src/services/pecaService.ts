export type StatusPeca = 'Doação' | 'Reparo' | 'Limpeza' | 'Em Estoque' | 'À Venda' | 'Vendida' | 'Perdida' | 'Devolução';
export type OrigemPeca = 'Compra' | 'Doação' | 'Própria';

export interface Peca {
    id: number;
    nome: string;
    
    marcaId: number;
    categoriaId: number;
    tipoId: number;
    tamanhoId: number;
    
    origem: OrigemPeca;
    valorCusto?: number; 
    dataAquisicao?: string;
    
    precoVenda: number;
    status: StatusPeca;
    dataStatusAtual: Date;
    
    corPrincipal: string;
    descricao?: string;
}

// eslint-disable-next-line
let inventario: Peca[] = [
    {
        id: 101,
        nome: "Vestido Floral Longo",
        marcaId: 1, 
        categoriaId: 1, 
        tipoId: 10, 
        tamanhoId: 4, 
        origem: 'Compra',
        valorCusto: 45.00,
        dataAquisicao: '2025-09-01',
        precoVenda: 120.00,
        status: 'À Venda',
        dataStatusAtual: new Date(),
        corPrincipal: 'Azul',
        descricao: "Vestido de tecido leve, ideal para o verão."
    },
];

let nextPecaId = 102;

export const getAllPecas = (): Peca[] => {
    return inventario;
};

export const addPeca = (novaPecaData: Omit<Peca, 'id' | 'dataStatusAtual'>): Peca => {
    const novaPeca: Peca = {
        id: nextPecaId++,
        ...novaPecaData,
        dataStatusAtual: new Date(),
    };
    inventario.push(novaPeca);
    return novaPeca;
};

export const updatePeca = (id: number, updates: Partial<Peca>): Peca | undefined => {
    const index = inventario.findIndex(p => p.id === id);
    if (index === -1) return undefined;

    const pecaAtualizada = {
        ...inventario[index],
        ...updates
    };

    if (updates.status && updates.status !== inventario[index].status) {
        pecaAtualizada.dataStatusAtual = new Date();
    }

    inventario[index] = pecaAtualizada;
    return pecaAtualizada;
};