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
    origem: 'Própria', 
    valorCusto: '',
    dataAquisicao: '',
    precoVenda: '',
    status: 'Em Estoque',
    corPrincipal: '',
    descricao: '',
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
        console.log('Dados a serem enviados para API (Ainda não implementado):', formData);
    };

    return (
        <div className="p-8 max-w-4xl mx-auto bg-white shadow-xl rounded-lg">
            <h1 className="text-3xl font-bold text-cachos-castanho mb-6 border-b-2 border-cachos-dourado pb-2">
                Cadastrar Nova Peça
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="border p-4 rounded-md bg-cachos-creme/50">
                    <h2 className="text-xl font-semibold mb-3">Detalhes de Aquisição</h2>
                    
                    <div className="flex space-x-4 mb-4">
                        {OPCOES_ORIGEM.map(origem => (
                            <label key={origem} className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="origem"
                                    value={origem}
                                    checked={formData.origem === origem}
                                    onChange={handleChange}
                                    className="text-cachos-dourado focus:ring-cachos-dourado"
                                />
                                <span className="text-cachos-castanho">{origem}</span>
                            </label>
                        ))}
                    </div>

                    {(formData.origem === 'Compra' || formData.origem === 'Doação') && (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Valor de Custo (Investimento)</label>
                                <input
                                    type="number"
                                    name="valorCusto"
                                    value={formData.valorCusto}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:border-cachos-dourado"
                                    required={formData.origem === 'Compra'}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Data de Aquisição</label>
                                <input
                                    type="date"
                                    name="dataAquisicao"
                                    value={formData.dataAquisicao}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:border-cachos-dourado"
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nome da Peça</label>
                        <input type="text" name="nome" value={formData.nome} onChange={handleChange} required
                            className="w-full p-2 border border-gray-300 rounded-md focus:border-cachos-dourado" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Preço de Venda (R$)</label>
                        <input type="number" name="precoVenda" value={formData.precoVenda} onChange={handleChange} required
                            className="w-full p-2 border border-gray-300 rounded-md focus:border-cachos-dourado" />
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    {['marca', 'categoria', 'tipo', 'tamanho'].map(field => (
                        <div key={field}>
                            <label className="block text-sm font-medium mb-1 capitalize">{field}</label>
                            <select 
                                name={field} 
                                value={formData[field as keyof PecaForm]} 
                                onChange={handleChange} 
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:border-cachos-dourado">
                                <option value="" disabled>Selecione ({field})</option>

                                <option value="1">Opção Teste 1</option>
                                <option value="2">Opção Teste 2</option>
                                <option value="add">Adicionar Nova...</option> {/* Opção para Criação Rápida */}
                            </select>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Status da Peça</label>
                        <select name="status" value={formData.status} onChange={handleChange} required
                            className="w-full p-2 border border-gray-300 rounded-md focus:border-cachos-dourado">
                            {OPCOES_STATUS.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Cor Principal</label>
                        <input type="text" name="corPrincipal" value={formData.corPrincipal} onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:border-cachos-dourado" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Descrição Detalhada</label>
                    <textarea name="descricao" value={formData.descricao} onChange={handleChange} rows={3}
                        className="w-full p-2 border border-gray-300 rounded-md focus:border-cachos-dourado" />
                </div>

                <button 
                    type="submit" 
                    className="w-full py-3 bg-cachos-dourado text-cachos-castanho font-bold rounded-md hover:bg-cachos-dourado/80 transition duration-300">
                    Cadastrar Peça
                </button>
            </form>
        </div>
    );
};

export default CadastroPeca;