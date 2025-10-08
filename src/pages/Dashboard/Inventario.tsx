// src/pages/Dashboard/Inventario.tsx
import React, { useState } from 'react';
import { useFetchData } from '../../utils/api'; 
import { Package, Eye, Pencil, X, RefreshCw } from 'lucide-react'; 
import type { Peca } from '../../types/Peca';

const OPCOES_STATUS_FILTRO: (string | undefined)[] = [
    'Todos', 'Limpeza', 'Reparo', 'Pronta p/ Consignação', 'Em Consignação', 'Vendida', 'Perdida'
];

const Inventario: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string | undefined>('Todos');

    const { data: pecas, loading, error, refresh } = useFetchData<Peca[]>('pecas');
    const pecasList = pecas || [];

    const filteredPecas = pecasList.filter(peca => {
        const statusMatch = statusFilter === 'Todos' || peca.status === statusFilter;
        
        const searchLower = searchTerm.toLowerCase();
        const searchMatch = peca.nome.toLowerCase().includes(searchLower) ||
                            peca.brechoParceiro?.toLowerCase().includes(searchLower) ||
                            peca.descricao?.toLowerCase().includes(searchLower) ||
                            peca.id.toString().includes(searchLower);

        return statusMatch && searchMatch;
    });

    if (loading) return <div className="text-center p-10 text-cachos-castanho">Carregando Inventário...</div>;
    if (error) return <div className="text-center p-10 text-red-600 bg-red-100 rounded-lg">{error}</div>;

    return (
        <div className="p-8 max-w-full mx-auto">
            <h1 className="text-4xl font-extrabold text-cachos-castanho mb-6">
                Banco de Peças ({pecasList.length} itens)
            </h1>

            <div className="mb-6 bg-white p-4 rounded-lg shadow-sm flex space-x-4 items-center">
                <input
                    type="text"
                    placeholder="Buscar por Nome, ID ou Parceiro..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:border-cachos-dourado"
                />

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md focus:border-cachos-dourado"
                >
                    {OPCOES_STATUS_FILTRO.map(status => (
                        <option key={status} value={status}>{status === 'Todos' ? 'Todos os Status' : status}</option>
                    ))}
                </select>
                
                <button onClick={refresh} className="p-2 bg-cachos-salvia text-white rounded-md hover:bg-cachos-salvia/90 flex items-center space-x-2">
                    <RefreshCw size={16} /> 
                    <span>Atualizar</span>
                </button>
            </div>


            <p className="text-lg text-gray-600 mb-4">Exibindo {filteredPecas.length} de {pecasList.length} peças.</p>
            
            <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-cachos-creme">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-cachos-castanho uppercase tracking-wider">ID / Nome</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-cachos-castanho uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-cachos-castanho uppercase tracking-wider">Custo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-cachos-castanho uppercase tracking-wider">Venda</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-cachos-castanho uppercase tracking-wider">Parceiro</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-cachos-castanho uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredPecas.map((peca) => (
                            <tr key={peca.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    <Package size={14} className="inline-block mr-2 text-cachos-castanho/70" />
                                    #{peca.id} - {peca.nome}
                                    <div className="text-xs text-gray-500">{peca.origem} | {peca.dataAquisicao}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        peca.status === 'Em Consignação' ? 'bg-cachos-salvia/20 text-cachos-salvia' :
                                        peca.status === 'Limpeza' ? 'bg-cachos-dourado/20 text-cachos-dourado' :
                                        'bg-gray-200 text-gray-800'
                                    }`}>
                                        {peca.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">R$ {peca.valorCusto?.toFixed(2) || 0.00}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">R$ {peca.precoVenda?.toFixed(2) || 'N/D'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {peca.brechoParceiro || 'Nenhum'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button title="Ver Detalhes" className="text-cachos-dourado hover:text-cachos-castanho mr-3"><Eye size={18} /></button>
                                    <button title="Editar" className="text-cachos-salvia hover:text-cachos-castanho mr-3"><Pencil size={18} /></button>
                                    <button title="Excluir" className="text-red-500 hover:text-red-700"><X size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Inventario;