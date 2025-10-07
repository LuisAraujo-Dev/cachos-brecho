interface Marca {
    id: number;
    nome: string;
}

const marcas: Marca[] = [
    { id: 1, nome: "Zara" },
    { id: 2, nome: "Renner" },
];
let nextId = 3;

export const getAllMarcas = (): Marca[] => {
    return marcas;
};

export const addMarca = (nome: string): Marca => {
    // Implementação de Criação Rápida
    const novaMarca: Marca = { id: nextId++, nome };
    marcas.push(novaMarca);
    return novaMarca;
};