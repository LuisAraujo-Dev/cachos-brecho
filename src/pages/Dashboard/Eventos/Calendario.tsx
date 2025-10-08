// src/pages/Dashboard/Eventos/Calendario.tsx
import React from 'react';
import CadastroEvento from './CadastroEvento';

const Calendario: React.FC = () => {
    // TODO: Aqui buscaremos os eventos da API /api/eventos
    const eventos = [
        { id: 1, nome: "Bazar Exemplo", data: "2025-10-20" }
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <h1 className="text-4xl font-extrabold text-cachos-castanho mb-8">
                Calendário de Aquisições (Bazares)
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <div className="md:col-span-1">
                    <CadastroEvento />
                </div>
                
                <div className="md:col-span-2 p-6 bg-white shadow-lg rounded-xl border border-cachos-castanho/10">
                    <h2 className="text-2xl font-semibold text-cachos-castanho mb-4">
                        Visualização Mensal (Em Desenvolvimento)
                    </h2>
                    
                    <div className="h-96 w-full flex items-center justify-center bg-cachos-creme border-4 border-dashed border-cachos-dourado/50 rounded-lg">
                        <p className="text-lg text-gray-500">
                            Gráfico de Calendário e Listagem de Eventos aqui. ({eventos.length} Eventos agendados)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendario;