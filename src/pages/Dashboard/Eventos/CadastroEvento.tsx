import React, { useState } from 'react';
import type { EventoForm } from '../../../types/Evento';

const INITIAL_FORM_STATE: EventoForm = {
    nome: '',
    data: '',
    horario: '', 
    local: '',
    observacoes: '',
};

const CadastroEvento: React.FC = () => {
    const [formData, setFormData] = useState<EventoForm>(INITIAL_FORM_STATE);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Evento a ser cadastrado na API (Com Horário):', formData);
        // TODO: Chamada POST para /api/eventos
        setFormData(INITIAL_FORM_STATE); 
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-xl border border-cachos-salvia/30">
            <h2 className="text-2xl font-semibold text-cachos-castanho mb-4">
                Agendar Novo Bazar/Evento
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                
                <div>
                    <label className="block text-sm font-medium mb-1">Nome do Bazar/Evento</label>
                    <input type="text" name="nome" value={formData.nome} onChange={handleChange} required
                        className="w-full p-2 border border-gray-300 rounded-md focus:border-cachos-dourado" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Data</label>
                        <input type="date" name="data" value={formData.data} onChange={handleChange} required
                            className="w-full p-2 border border-gray-300 rounded-md focus:border-cachos-dourado" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Horário</label>
                        <input type="time" name="horario" value={formData.horario} onChange={handleChange} required
                            className="w-full p-2 border border-gray-300 rounded-md focus:border-cachos-dourado" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Local/Endereço</label>
                    <input type="text" name="local" value={formData.local} onChange={handleChange} required
                        className="w-full p-2 border border-gray-300 rounded-md focus:border-cachos-dourado" />
                </div>
                
                <div>
                    <label className="block text-sm font-medium mb-1">Observações (Metas de compra, etc.)</label>
                    <textarea name="observacoes" value={formData.observacoes} onChange={handleChange} rows={2}
                        className="w-full p-2 border border-gray-300 rounded-md focus:border-cachos-dourado" />
                </div>

                <button 
                    type="submit" 
                    className="w-full py-2 bg-cachos-salvia text-white font-bold rounded-md hover:bg-cachos-salvia/80 transition duration-300">
                    Agendar Evento
                </button>
            </form>
        </div>
    );
};

export default CadastroEvento;