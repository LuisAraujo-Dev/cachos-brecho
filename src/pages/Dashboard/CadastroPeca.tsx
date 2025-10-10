// src/pages/Dashboard/CadastroPeca.tsx
import React, { useState } from 'react';
import { postData } from '../../utils/api';
import type { StatusPeca, OrigemPeca, PecaForm, Peca } from '../../types/Peca';

const OPCOES_STATUS: StatusPeca[] = ['Limpeza', 'Reparo', 'Pronta p/ Consignação', 'Em Consignação', 'Vendida', 'Perdida', 'Devolução'];
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
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setIsLoading(true);

        const pecaParaAPI = {
            nome: formData.nome,
            
            marcaId: 1, 
            categoriaId: 1,
            tipoId: 10,
            tamanhoId: 4,
            
            origem: formData.origem,
            valorCusto: formData.valorCusto || 0,
            dataAquisicao: formData.dataAquisicao,
            
            precoVenda: formData.precoVenda || 0,
            status: formData.status,
            
            corPrincipal: formData.corPrincipal,
            descricao: formData.descricao,
            brechoParceiro: formData.brechoParceiro,
        };

        try {
            const novaPeca = await postData<Peca, typeof pecaParaAPI>('pecas', pecaParaAPI);
            
            setMessage({ 
                type: 'success', 
                text: `Peça "${novaPeca.nome}" (#${novaPeca.id}) cadastrada com sucesso!` 
            });
            setFormData(INITIAL_FORM_STATE);
        } catch (error) {
            console.error('Erro ao cadastrar peça:', error);
            setMessage({ 
                type: 'error', 
                text: `Falha no cadastro: ${error instanceof Error ? error.message : 'Erro desconhecido'}` 
            });
        } finally {
            setIsLoading(false);
        }
    };

    const isCompra = formData.origem === 'Compra' || formData.origem === 'Doação';

    return (
        <div className="p-8 max-w-4xl mx-auto bg-white shadow-xl rounded-lg">
            <h1 className="text-3xl font-bold text-[var(--color-castanho)] mb-6 border-b-2 border-cachos-dourado pb-2">
                Cadastro de Peça (Pós-Bazar)
            </h1>
            
            {message && (
                <div className={`p-3 mb-4 rounded-md font-medium ${
                    message.type === 'success' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                }`}>
                    {message.text}
                </div>
            )}

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
                            <input type="number" name="valorCusto" value={formData.valorCusto} onChange={handleChange} required={isCompra}
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

                <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium mb-1">Cor Principal</label>
                        <input type="text" name="corPrincipal" value={formData.corPrincipal} onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:border-cachos-dourado" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Brechó Parceiro (Se consignado)</label>
                        <input type="text" name="brechoParceiro" value={formData.brechoParceiro} onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:border-cachos-dourado" />
                    </div>
                </div>
                
                <div>
                    <label className="block text-sm font-medium mb-1">Anotações de Processamento (Reparos/Limpeza)</label>
                    <textarea name="descricao" value={formData.descricao} onChange={handleChange} rows={3}
                        className="w-full p-2 border border-gray-300 rounded-md focus:border-cachos-dourado" />
                </div>

                <button 
                    type="submit" 
                    className={`w-full py-3 font-bold rounded-md transition duration-300 ${
                        isLoading 
                            ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                            : 'bg-cachos-dourado text-[var(--color-castanho)] hover:bg-cachos-dourado/80'
                    }`}
                    disabled={isLoading}>
                    {isLoading ? 'Registrando...' : 'Registrar Compra e Iniciar Processamento'}
                </button>
            </form>
        </div>
    );
};

export default CadastroPeca;