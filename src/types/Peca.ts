export type StatusPeca = 'Limpeza' | 'Reparo' | 'Pronta p/ Consignação' | 'Em Consignação' | 'Vendida' | 'Perdida' | 'Devolução';
export type OrigemPeca = 'Compra' | 'Doação' | 'Própria';

export interface Marca {
    id: number;
    nome: string;
}

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
    
    precoVenda?: number;
    status: StatusPeca;
    dataStatusAtual: Date;
    
    corPrincipal: string;
    descricao?: string;

    brechoParceiro?: string;

    marca?: Marca;
}

export interface PecaForm {
    nome: string;
    
    marca: string; 
    categoria: string;
    tipo: string;
    tamanho: string;
    
    origem: OrigemPeca;
    valorCusto?: number | ''; 
    dataAquisicao?: string;
    
    precoVenda?: number | '';
    status: StatusPeca;
    
    corPrincipal: string;
    descricao: string;

    brechoParceiro: string;
}