import React, { useState, useEffect } from 'react';
import type { Peca, Marca, StatusPeca, PecaForm } from '../../../types/Peca';

const API_BASE_URL = 'http://localhost:3000/api';

interface ModalProps {
    peca: Peca | null; 
    onClose: () => void;
    onSave: () => void; 
    todasMarcas: Marca[];
}

const OPCOES_STATUS: StatusPeca[] = ['Limpeza', 'Reparo', 'Pronta p/ Consignação', 'Em Consignação', 'Vendida', 'Perdida', 'Devolução'];

const ModalEdicaoPeca: React.FC<ModalProps> = ({ peca, onClose, onSave, todasMarcas }) => {
    
    const [formData, setFormData] = useState<PecaForm | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (peca) {
            setFormData({
                nome: peca.nome || '',
                marca: peca.marca?.id.toString() || peca.marcaId.toString(),
                categoria: peca.categoriaId.toString(),
                tipo: peca.tipoId.toString(),
                tamanho: peca.tamanhoId.toString(),
                
                origem: peca.origem,
                valorCusto: peca.valorCusto || '',
                dataAquisicao: peca.dataAquisicao || '',
                
                precoVenda: peca.precoVenda || '', 
                status: peca.status,
                
                corPrincipal: peca.corPrincipal || '',
                descricao: peca.descricao || '',
                brechoParceiro: peca.brechoParceiro || '',
            });
        }
    }, [peca]);

    if (!peca || !formData) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev!,
            [name]: value,
        }));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const updatesParaAPI: Partial<Peca> = {
            nome: formData.nome,
            marcaId: Number(formData.marca), 
            categoriaId: Number(formData.categoria),
            tipoId: Number(formData.tipo),
            tamanhoId: Number(formData.tamanho),
            
            origem: formData.origem,
            valorCusto: Number(formData.valorCusto) || 0,
            dataAquisicao: formData.dataAquisicao,
            
            precoVenda: Number(formData.precoVenda) || 0,
            status: formData.status, 
            
            corPrincipal: formData.corPrincipal,
            descricao: formData.descricao,
            brechoParceiro: formData.brechoParceiro,
        };
        
        try {
            const response = await fetch(`${API_BASE_URL}/pecas/${peca.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatesParaAPI),
            });

            if (!response.ok) throw new Error("Falha ao salvar peça.");
            
            alert(`Peça ${peca.id} atualizada com sucesso!`);
            onSave(); 
            onClose(); 
        } catch (error) {
            console.error('Erro ao atualizar peça:', error);
            alert("Erro ao salvar. Verifique o console.");
        } finally {
            setIsLoading(false);
        }
    };

    const isCompra = formData.origem === 'Compra' || formData.origem === 'Doação';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6 border-b pb-3">
                    <h2 className="text-2xl font-bold text-cachos-castanho">
                        Editar Peça #{peca.id} - {peca.nome}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-900 text-3xl">&times;</button>
                </div>
                
                <form onSubmit={handleSave} className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Nome</label>
                            <input type="text" name="nome" value={formData.nome} onChange={handleChange} required
                                className="w-full p-2 border rounded-md" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Preço Venda (R$)</label>
                            <input type="number" name="precoVenda" value={formData.precoVenda} onChange={handleChange}
                                className="w-full p-2 border rounded-md bg-green-50/70" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium mb-1">Status (RF.ADM.05)</label>
                            <select name="status" value={formData.status} onChange={handleChange} required
                                className="w-full p-2 border rounded-md bg-cachos-dourado/20">
                                {OPCOES_STATUS.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4">
                         <div>
                            <label className="block text-sm font-medium mb-1">Marca</label>
                            <select name="marca" value={formData.marca} onChange={handleChange} required
                                className="w-full p-2 border rounded-md">
                                {todasMarcas.map(m => (
                                    <option key={m.id} value={m.id.toString()}>{m.nome}</option>
                                ))}
                            </select>
                        </div>

                        {['categoria', 'tipo', 'tamanho'].map(field => (
                            <div key={field}>
                                <label className="block text-sm font-medium mb-1 capitalize">{field}</label>
                                <select name={field} value={formData[field as keyof PecaForm]} onChange={handleChange} required
                                    className="w-full p-2 border rounded-md">
                                    <option value="" disabled>Selecione</option>
                                    <option value="1">Teste 1</option>
                                    <option value="2">Teste 2</option>
                                </select>
                            </div>
                        ))}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Custo (R$)</label>
                            <input type="number" name="valorCusto" value={formData.valorCusto} onChange={handleChange} required={isCompra}
                                className="w-full p-2 border rounded-md" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Brechó Parceiro</label>
                            <input type="text" name="brechoParceiro" value={formData.brechoParceiro} onChange={handleChange}
                                className="w-full p-2 border rounded-md" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Cor</label>
                            <input type="text" name="corPrincipal" value={formData.corPrincipal} onChange={handleChange}
                                className="w-full p-2 border rounded-md" />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1">Anotações de Processamento</label>
                        <textarea name="descricao" value={formData.descricao} onChange={handleChange} rows={2}
                            className="w-full p-2 border rounded-md" />
                    </div>
                    
                    <div className="pt-4 flex justify-end space-x-3">
                        <button type="button" onClick={onClose} className="py-2 px-4 border rounded-md text-gray-700 hover:bg-gray-100">
                            Cancelar
                        </button>
                        <button type="submit" disabled={isLoading}
                            className={`py-2 px-4 rounded-md text-white font-bold transition ${
                                isLoading ? 'bg-gray-400' : 'bg-cachos-salvia hover:bg-cachos-salvia/90'
                            }`}>
                            {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalEdicaoPeca;