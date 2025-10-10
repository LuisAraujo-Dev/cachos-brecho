import React, { useState, useMemo } from 'react';
import { useFetchData, postData, deleteData } from '../../../utils/api';
import { PlusCircle, TrendingDown, Trash2 } from 'lucide-react';
import type { CategoriaDespesa, DespesaForm, Despesa } from '../../../types/Despesa';
const CATEGORIAS: CategoriaDespesa[] = ['Limpeza', 'Reparo', 'Envio', 'Embalagem', 'Marketing', 'Fixo', 'Outros'];

const INITIAL_FORM_STATE: DespesaForm = {
    data: new Date().toISOString().substring(0, 10),
    valor: '',
    descricao: '',
    categoria: '',
};

const formatCurrency = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const ControleDespesas: React.FC = () => {
    const { data: despesas, loading, error, refresh } = useFetchData<Despesa[]>('despesas');

    const despesasList: Despesa[] = useMemo(() => (despesas && Array.isArray(despesas) ? despesas : []), [despesas]); 

    const [formData, setFormData] = useState<DespesaForm>(INITIAL_FORM_STATE);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setIsLoading(true);

        const despesaParaAPI = {
            ...formData,
            valor: Number(formData.valor),
            categoria: formData.categoria as CategoriaDespesa,
        };

        try {
            await postData<Despesa, typeof despesaParaAPI>('despesas', despesaParaAPI);
            setMessage({ type: 'success', text: 'Despesa registrada com sucesso!' });
            setFormData(INITIAL_FORM_STATE);
            refresh();
        } catch (err) {
            setMessage({ type: 'error', text: 'Falha ao registrar despesa.' });
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Tem certeza que deseja excluir esta despesa? Esta ação é irreversível.")) {
            return;
        }

        try {
            await deleteData('despesas', id);
            setMessage({ type: 'success', text: 'Despesa excluída com sucesso.' });
            refresh();
        } catch (error) {
            setMessage({ type: 'error', text: 'Falha ao excluir despesa.' });
            console.error(error);
        }
    };

    const totalDespesas = useMemo(() => {
        return despesasList.reduce((acc, d) => acc + d.valor, 0); 
    }, [despesasList]); 

    if (loading) return <div className="text-center p-10 text-[var(--color-castanho)]">Carregando Controle Financeiro...</div>;
    if (error) return <div className="text-center p-10 text-red-600 bg-red-100 rounded-lg">{error}</div>;

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <h1 className="text-4xl font-extrabold text-[var(--color-castanho)] mb-6">
                Controle de Despesas Operacionais
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                <div className="md:col-span-1">
                    <div className="p-6 bg-white shadow-xl rounded-xl border-l-4 border-cachos-dourado">
                        <h2 className="text-2xl font-semibold text-[var(--color-castanho)] mb-4 flex items-center space-x-2">
                            <PlusCircle size={20} />
                            <span>Nova Despesa</span>
                        </h2>
                        {message && (
                            <div className={`p-3 mb-3 rounded-md text-sm ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {message.text}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Valor (R$)</label>
                                <input type="number" name="valor" value={formData.valor} onChange={handleChange} required
                                    className="w-full p-2 border border-gray-300 rounded-md focus:border-cachos-dourado" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Data</label>
                                <input type="date" name="data" value={formData.data} onChange={handleChange} required
                                    className="w-full p-2 border border-gray-300 rounded-md focus:border-cachos-dourado" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Categoria</label>
                                <select name="categoria" value={formData.categoria} onChange={handleChange} required
                                    className="w-full p-2 border border-gray-300 rounded-md focus:border-cachos-dourado">
                                    <option value="" disabled>Selecione a Categoria</option>
                                    {CATEGORIAS.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Descrição</label>
                                <textarea name="descricao" value={formData.descricao} onChange={handleChange} rows={2}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:border-cachos-dourado" />
                            </div>
                            <button type="submit" disabled={isLoading}
                                className={`w-full py-2 font-bold rounded-md transition duration-300 ${isLoading ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600 text-white'}`}>
                                {isLoading ? 'Registrando...' : 'Registrar Despesa'}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <div className="flex justify-between items-center mb-4 border-b pb-3">
                            <h2 className="text-2xl font-semibold text-[var(--color-castanho)] flex items-center space-x-2">
                                <TrendingDown size={24} className="text-red-500" />
                                <span>Gastos Registrados</span>
                            </h2>
                            <h3 className="text-3xl font-bold text-red-500">{formatCurrency(totalDespesas)}</h3>
                        </div>

                        <div className="h-96 overflow-y-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-cachos-creme sticky top-0">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Categoria</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Descrição</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {despesasList.slice(0).reverse().map((d) => (
                                        <tr key={d.id}>
                                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{d.data}</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-sm">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-cachos-dourado/20 text-[var(--color-castanho)]">
                                                    {d.categoria}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2 whitespace-nowrap text-sm text-red-500 font-medium">{formatCurrency(d.valor)}</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{d.descricao}</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-sm">
                                                <button
                                                    onClick={() => handleDelete(d.id)}
                                                    title="Excluir Despesa"
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
                </div>
            </div>
        </div>
    );
};

export default ControleDespesas;