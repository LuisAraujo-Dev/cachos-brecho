export interface Evento {
    id: number;
    nome: string;
    data: string; 
    local: string;
    observacoes?: string;
    horario: string; 
}
// eslint-disable-next-line
let eventos: Evento[] = [
    { 
        id: 1, 
        nome: "Bazar Paroquial de Outubro", 
        data: '2025-10-20', 
        local: 'Igreja Matriz Central', 
        observacoes: 'Chegar cedo para as melhores peças.', 
        horario: "09:30"
    },
];
let nextEventoId = 2;

export const addEvento = (novoEventoData: Omit<Evento, 'id'>): Evento => {
    const novoEvento: Evento = {
        id: nextEventoId++,
        ...novoEventoData,
    };
    eventos.push(novoEvento);
    return novoEvento;
};

export const getAllEventos = (): Evento[] => {
    return eventos;
};