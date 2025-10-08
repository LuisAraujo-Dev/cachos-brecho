import React from 'react';
import CadastroEvento from './CadastroEvento';
import { useFetchData } from '../../../utils/api';
import { Calendar as CalendarIcon, MapPin, Clock } from 'lucide-react'; // Ícones Lucide
import type { Evento } from '../../../types/Evento';

const Calendario: React.FC = () => {
    const { data: eventos, loading, error, refresh } = useFetchData<Evento[]>('eventos');

    const eventosList = eventos || [];

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
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold text-cachos-castanho">
                            Próximos Bazares ({eventosList.length} Eventos)
                        </h2>
                        <button onClick={refresh} className="text-sm text-cachos-dourado hover:text-cachos-castanho">
                            Atualizar Lista
                        </button>
                    </div>

                    {loading && <div className="text-center text-gray-500">Carregando eventos...</div>}
                    {error && <div className="text-red-600">Erro ao carregar o calendário.</div>}
                    
                    {!loading && eventosList.length === 0 && (
                        <div className="text-center p-10 text-gray-500 bg-cachos-creme/50 rounded-lg">
                            Nenhum bazar agendado.
                        </div>
                    )}
                    
                    <div className="space-y-4">
                        {eventosList.map(evento => (
                            <div key={evento.id} className="p-4 border-l-4 border-cachos-salvia bg-gray-50 rounded-lg shadow-sm">
                                <p className="font-bold text-lg text-cachos-castanho">{evento.nome}</p>
                                <div className="text-sm text-gray-600 space-y-1 mt-1">
                                    <p className="flex items-center space-x-2">
                                        <CalendarIcon size={16} className="text-cachos-dourado" />
                                        <span>{evento.data}</span>
                                        <Clock size={16} className="text-cachos-dourado ml-4" />
                                        <span>{evento.horario}</span>
                                    </p>
                                    <p className="flex items-center space-x-2">
                                        <MapPin size={16} />
                                        <span>{evento.local}</span>
                                    </p>
                                    {evento.observacoes && (
                                        <p className="text-xs italic pt-1 text-gray-500">Obs: {evento.observacoes}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendario;