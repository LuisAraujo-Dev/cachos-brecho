import React, { useState } from 'react';
import type { Evento, EventoForm } from '../../../types/Evento';
import { postData } from '../../../utils/api'; 

const INITIAL_FORM_STATE: EventoForm = {
    nome: '',
    data: '',
    horario: '', 
    local: '',
    observacoes: '',
};

const CadastroEvento: React.FC = () => {
    const [formData, setFormData] = useState<EventoForm>(INITIAL_FORM_STATE);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setIsLoading(true);

        try {
            const novoEvento = await postData<Evento, EventoForm>('eventos', formData); 
            
            setMessage({ 
                type: 'success', 
                text: `Bazar "${novoEvento.nome}" agendado para ${novoEvento.data} às ${novoEvento.horario}!` 
            });
            setFormData(INITIAL_FORM_STATE); // Limpa o formulário
        } catch (error) {
            console.error('Erro ao cadastrar evento:', error);
            setMessage({ 
                type: 'error', 
                text: `Falha no agendamento: ${error instanceof Error ? error.message : 'Erro desconhecido'}` 
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-xl border border-cachos-salvia/30">
            <h2 className="text-2xl font-semibold text-cachos-castanho mb-4">
                Agendar Novo Bazar/Evento
            </h2>
            
            {message && (
                <div className={`p-3 mb-4 rounded-md font-medium ${
                    message.type === 'success' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                }`}>
                    {message.text}
                </div>
            )}
            
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
                    className={`w-full py-2 font-bold rounded-md transition duration-300 ${
                        isLoading 
                            ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                            : 'bg-cachos-salvia text-white hover:bg-cachos-salvia/80'
                    }`}
                    disabled={isLoading}>
                    {isLoading ? 'Agendando...' : 'Agendar Evento'}
                </button>
            </form>
        </div>
    );
};

export default CadastroEvento;