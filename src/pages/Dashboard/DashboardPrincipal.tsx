import React from 'react';

const DashboardPrincipal: React.FC = () => {
    return (
        <div className="p-8">
            <h1 className="text-4xl font-extrabold text-cachos-castanho mb-6">
                Dashboard Geral
            </h1>
            <p className="text-lg text-gray-600 mb-8">
                Visão geral da saúde financeira e do estoque do brechó.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-cachos-dourado">
                    <p className="text-sm font-medium text-gray-500">Peças em Estoque</p>
                    <p className="text-3xl font-bold text-cachos-castanho mt-1">10</p>
                    <p className="text-xs text-green-500 mt-2">Prontas para Consignação</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-cachos-salvia">
                    <p className="text-sm font-medium text-gray-500">Vendas (Mês)</p>
                    <p className="text-3xl font-bold text-cachos-castanho mt-1">R$ 0,00</p>
                    <p className="text-xs text-gray-500 mt-2">Faturamento (RF.ADM.13)</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500">
                    <p className="text-sm font-medium text-gray-500">Investimento (Mês)</p>
                    <p className="text-3xl font-bold text-cachos-castanho mt-1">R$ 45,00</p>
                    <p className="text-xs text-gray-500 mt-2">Valor de Custo (RF.ADM.14)</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
                    <p className="text-sm font-medium text-gray-500">Alertas</p>
                    <p className="text-3xl font-bold text-red-500 mt-1">1</p>
                    <p className="text-xs text-red-500 mt-2">Peça em Reparo há mais de 7 dias</p>
                </div>
            </div>
            {/* TODO: Gráficos de Lucro (RF.ADM.14) e Status (RF.ADM.12) */}
        </div>
    );
};

export default DashboardPrincipal;