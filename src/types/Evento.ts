export interface Evento {
    id: number;
    nome: string; 
    data: string; // YYYY-MM-DD
    local: string; 
    observacoes?: string;
    horario: string;
}

export interface EventoForm {
    nome: string; 
    data: string;
    local: string; 
    observacoes: string;
    horario: string; 
}