import React from 'react';
import { useFetchData } from '../../utils/api';
import { calculateMetrics } from '../../services/dashboardService';
import { Package, DollarSign, TrendingUp, AlertTriangle, Calendar } from 'lucide-react';
import type { Peca } from '../../types/Peca';

const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const DashboardPrincipal: React.FC = () => {
    const { data: pecas, loading, error } = useFetchData<Peca[]>('pecas');
    
    const metrics = pecas ? calculateMetrics(pecas) : null;

    if (loading) return <div className="text-center p-10 text-[var(--color-castanho)]">Carregando Dashboard...</div>;
    if (error) return <div className="text-center p-10 text-red-600 bg-red-100 rounded-lg">{error}</div>;
    if (!metrics) return <div className="text-center p-10 text-gray-500">Nenhum dado encontrado para o Dashboard.</div>;

    const totalPecasProntas = metrics.pecasProntasParaConsignacao;
    const totalPecasProcessamento = metrics.pecasEmProcessamento;

    return (
        <div className="p-8">
            <h1 className="text-4xl font-extrabold text-[var(--color-castanho)] mb-6">
                Dashboard Geral
            </h1>
            <p className="text-lg text-gray-600 mb-8">
                Visão geral da saúde financeira e do estoque do brechó.
            </p>

            {metrics.alertas.length > 0 && (
                <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6 rounded-md">
                    <div className="flex items-center space-x-3">
                        <AlertTriangle className="text-red-500" size={24} />
                        <h3 className="text-lg font-semibold text-red-700">Ações Urgentes ({metrics.alertas.length})</h3>
                    </div>
                    <ul className="list-disc ml-8 mt-2 text-sm text-red-600">
                        {metrics.alertas.slice(0, 3).map((alerta, index) => (
                            <li key={index}>{alerta}</li>
                        ))}
                        {metrics.alertas.length > 3 && <li>E mais {metrics.alertas.length - 3} alertas...</li>}
                    </ul>
                </div>
            )}


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border[var(--color-salvia)]">
                    <p className="text-sm font-medium text-gray-500 flex items-center space-x-2"><Package size={16} /> PEÇAS ATIVAS</p>
                    <p className="text-3xl font-bold text-[var(--color-castanho)] mt-1">{totalPecasProntas}</p>
                    <p className="text-xs text-gray-500 mt-2">Prontas para Consignação/Em Venda</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[var(--color-dourado)]">
                    <p className="text-sm font-medium text-gray-500 flex items-center space-x-2"><Calendar size={16} /> EM PROCESSO</p>
                    <p className="text-3xl font-bold text-[var(--color-castanho)] mt-1">{totalPecasProcessamento}</p>
                    <p className="text-xs text-gray-500 mt-2">Aguardando Limpeza ou Reparo</p>
                </div>
                
                <div className={`bg-white p-6 rounded-xl shadow-lg border-l-4 ${metrics.valorInvestidoMes > 0 ? 'border-red-500' : 'border-gray-300'}`}>
                    <p className="text-sm font-medium text-gray-500 flex items-center space-x-2"><DollarSign size={16} /> INVESTIMENTO (MÊS)</p>
                    <p className="text-3xl font-bold text-red-500 mt-1">{formatCurrency(metrics.valorInvestidoMes)}</p>
                    <p className="text-xs text-gray-500 mt-2">Custo de Aquisições no mês</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
                    <p className="text-sm font-medium text-gray-500 flex items-center space-x-2"><TrendingUp size={16} /> FATURAMENTO (MÊS)</p>
                    <p className="text-3xl font-bold text-green-500 mt-1">{formatCurrency(metrics.faturamentoMes)}</p>
                    <p className="text-xs text-gray-500 mt-2">Lucro Bruto: {formatCurrency(metrics.lucroBrutoMes)}</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardPrincipal;