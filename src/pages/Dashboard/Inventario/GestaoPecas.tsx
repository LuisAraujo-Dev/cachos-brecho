import React, { useState, useMemo } from 'react';
import { useFetchData, deleteData } from '../../../utils/api';
import { Edit, Trash2, Box, RefreshCw } from 'lucide-react';
import ModalEdicaoPeca from './ModalEdicaoPeca';
import type { Peca, Marca } from '../../../types/Peca';

const formatCurrency = (value?: number) => value ? value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-';

const GestaoPecas: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pecaToEdit, setPecaToEdit] = useState<Peca | null>(null);
    
    const { data: pecas, loading, error, refresh } = useFetchData<Peca[]>('pecas');
    const { data: marcasData } = useFetchData<Marca[]>('marcas');
    
    const pecasList: Peca[] = useMemo(() => pecas || [], [pecas]);
    const todasMarcas: Marca[] = useMemo(() => marcasData || [], [marcasData]);

    const handleEdit = (peca: Peca) => {
        setPecaToEdit(peca);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number, nome: string) => {
        if (!window.confirm(`Tem certeza que deseja excluir a peça "${nome}"? Esta ação é irreversível.`)) {
            return;
        }

        try {
            await deleteData('pecas', id);
            alert(`Peça "${nome}" excluída com sucesso.`);
            refresh(); 
        } catch (error) {
            alert('Falha ao excluir peça.');
            console.error(error);
        }
    };


    if (loading) return <div className="text-center p-10 text-[var(--color-castanho)]">Carregando Inventário...</div>;
    if (error) return <div className="text-center p-10 text-red-600 bg-red-100 rounded-lg">{error}</div>;


    return (
        <div className="p-8 max-w-full mx-auto">
            <h1 className="text-4xl font-extrabold text-[var(--color-castanho)] mb-6 flex items-center space-x-3">
                <Box size={32} />
                <span>Gestão Completa de Inventário</span>
            </h1>
            
            <div className="mb-4 flex justify-between items-center">
                <p className="text-lg text-gray-600">Total de {pecasList.length} peças registradas.</p>
                <button onClick={refresh} className="p-2 bg-[var(--color-salvia)] text-white rounded-md hover:bg-[var(--color-salvia)90] flex items-center space-x-2">
                    <RefreshCw size={16} /> 
                    <span>Atualizar Lista</span>
                </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-cachos-creme sticky top-0">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Marca</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Preço Venda</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Aquisição</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {pecasList.map((p) => (
                                <tr key={p.id}>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm font-semibold text-[var(--color-castanho)]">{p.id}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{p.nome}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
                                        {p.marca?.nome || 'ID: ' + p.marcaId} 
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${p.status === 'Vendida' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {p.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-green-600">{formatCurrency(p.precoVenda)}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{formatCurrency(p.valorCusto)}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm flex space-x-2">
                                        <button 
                                            onClick={() => handleEdit(p)}
                                            title="Editar Peça"
                                            className="text-cachos-dourado hover:text-[var(--color-castanho)] transition"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(p.id, p.nome)}
                                            title="Excluir Peça"
                                            className="text-red-500 hover:text-red-700 transition"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <ModalEdicaoPeca 
                    peca={pecaToEdit}
                    todasMarcas={todasMarcas}
                    onClose={() => setIsModalOpen(false)}
                    onSave={refresh}
                />
            )}
        </div>
    );
};

export default GestaoPecas;