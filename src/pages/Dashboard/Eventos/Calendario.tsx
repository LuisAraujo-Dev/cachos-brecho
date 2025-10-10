import React, { useMemo } from 'react';
import CadastroEvento from './CadastroEvento';
import { useFetchData } from '../../../utils/api';
import type { Evento } from '../../../types/Evento';
import { Calendar as CalendarIcon, MapPin, Clock, RefreshCw } from 'lucide-react'; 

const Calendario: React.FC = () => {
    const { data: eventos, loading, error, refresh } = useFetchData<Evento[]>('eventos');

    const eventosList: Evento[] = useMemo(() => (eventos && Array.isArray(eventos) ? eventos : []), [eventos]); 

    if (loading) return <div className="text-center p-10 text-[var(--color-castanho)]">Carregando Calendário...</div>;
    if (error) return <div className="text-center p-10 text-red-600 bg-red-100 rounded-lg">{error}</div>;

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <h1 className="text-4xl font-extrabold text-[var(--color-castanho)] mb-8">
                Calendário de Aquisições (Bazares)
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <div className="md:col-span-1">
                    <CadastroEvento onEventCreated={refresh} />
                </div>
                
                <div className="md:col-span-2 p-6 bg-white shadow-lg rounded-xl border border-[var(--color-castanho)]/10">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold text-[var(--color-castanho)]">
                            Próximos Bazares ({eventosList.length} Eventos)
                        </h2>
                        <button onClick={refresh} title="Atualizar Lista" className="text-sm text-cachos-dourado hover:text-[var(--color-castanho)]">
                            <RefreshCw size={18} />
                        </button>
                    </div>
                    
                    {!loading && eventosList.length === 0 && (
                        <div className="text-center p-10 text-gray-500 bg-cachos-creme/50 rounded-lg">
                            Nenhum bazar agendado. Use o formulário ao lado para começar o planejamento!
                        </div>
                    )}
                    
                    <div className="space-y-4">
                        {eventosList.map(evento => (
                            <div key={evento.id} className="p-4 border-l-4 border-[var(--color-salvia)] bg-gray-50 rounded-lg shadow-sm">
                                <p className="font-bold text-lg text-[var(--color-castanho)]">{evento.nome}</p>
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