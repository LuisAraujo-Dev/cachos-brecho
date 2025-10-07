// src/pages/Dashboard/CadastroPeca.tsx
import React, { useState } from 'react';
import type { OrigemPeca, PecaForm, StatusPeca } from '../../types/Peca';

const OPCOES_STATUS: StatusPeca[] = ['Doação', 'Reparo', 'Limpeza', 'Em Estoque', 'À Venda'];
const OPCOES_ORIGEM: OrigemPeca[] = ['Compra', 'Doação', 'Própria'];

const INITIAL_FORM_STATE: PecaForm = {
    nome: '',
    marca: '',
    categoria: '',
    tipo: '',
    tamanho: '',
    origem: 'Compra',
    valorCusto: '',
    dataAquisicao: new Date().toISOString().substring(0, 10), 
    precoVenda: '', 
    status: 'Limpeza', 
    corPrincipal: '',
    descricao: '', 
    brechoParceiro: '', 
};

const CadastroPeca: React.FC = () => {
    const [formData, setFormData] = useState<PecaForm>(INITIAL_FORM_STATE);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Dados a serem enviados para API (Com Status Inicial LIMPEZA):', formData);
        // TODO: Chamar API com os dados e ID do brechó (usaremos 1 por enquanto)
    };

     return (
        <div className="p-8 max-w-4xl mx-auto bg-white shadow-xl rounded-lg">
            <h1 className="text-3xl font-bold text-cachos-castanho mb-6 border-b-2 border-cachos-dourado pb-2">
                Cadastro de Peça (Pós-Bazar)
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="border p-4 rounded-md bg-cachos-creme/50">
                    <h2 className="text-xl font-semibold mb-3">1. Aquisição</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Origem</label>
                            <select name="origem" value={formData.origem} onChange={handleChange} required
                                className="w-full p-2 border border-gray-300 rounded-md focus:border-cachos-dourado">
                                {OPCOES_ORIGEM.map(origem => (
                                    <option key={origem} value={origem}>{origem}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Valor de Custo (R$)</label>
                            <input type="number" name="valorCusto" value={formData.valorCusto} onChange={handleChange} required={formData.origem === 'Compra'}
                                className="w-full p-2 border border-gray-300 rounded-md focus:border-cachos-dourado" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Data de Aquisição</label>
                            <input type="date" name="dataAquisicao" value={formData.dataAquisicao} onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:border-cachos-dourado" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nome da Peça</label>
                        <input type="text" name="nome" value={formData.nome} onChange={handleChange} required
                            className="w-full p-2 border border-gray-300 rounded-md focus:border-cachos-dourado" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Status Atual</label>
                        <select name="status" value={formData.status} onChange={handleChange} required
                            className="w-full p-2 border border-gray-300 rounded-md focus:border-cachos-dourado bg-cachos-dourado/20">
                            {OPCOES_STATUS.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    {['marca', 'categoria', 'tipo', 'tamanho'].map(field => (
                        <div key={field}>
                            <label className="block text-sm font-medium mb-1 capitalize">{field}</label>
                            <select name={field} value={formData[field as keyof PecaForm]} onChange={handleChange} required
                                className="w-full p-2 border border-gray-300 rounded-md focus:border-cachos-dourado">
                                <option value="" disabled>Selecione ({field})</option>
                                <option value="1">Opção Teste 1</option>
                                <option value="add">Adicionar Nova...</option> 
                            </select>
                        </div>
                    ))}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Anotações de Processamento (Reparos/Limpeza)</label>
                    <textarea name="descricao" value={formData.descricao} onChange={handleChange} rows={3}
                        className="w-full p-2 border border-gray-300 rounded-md focus:border-cachos-dourado" />
                </div>

                <button type="submit" 
                    className="w-full py-3 bg-cachos-dourado text-cachos-castanho font-bold rounded-md hover:bg-cachos-dourado/80 transition duration-300">
                    Registrar Compra e Iniciar Processamento
                </button>
            </form>
        </div>
    );
};

export default CadastroPeca;