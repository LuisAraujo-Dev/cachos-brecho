import React, { useState } from 'react';
import Inventario from './Inventario/GestaoPecas';
import CadastroPeca from '../Dashboard/CadastroPeca';
import Calendario from '../Dashboard/Eventos/Calendario';
import DashboardPrincipal from './DashboardPrincipal';
import ControleDespesas from './Financas/ControleDespesas';
import { LayoutDashboard, Package, Calendar, Settings, DollarSign, BarChart3, Receipt, Box } from 'lucide-react';
import GestaoPecas from './Inventario/GestaoPecas';

const pages = {
    dashboard: { component: DashboardPrincipal, name: 'Dashboard Geral', icon: LayoutDashboard },
    inventario: { component: Inventario, name: 'Banco de Peças', icon: Package },
    cadastro: { component: CadastroPeca, name: 'Novo Cadastro', icon: DollarSign },
    despesas: { component: ControleDespesas, name: 'Controle de Despesas', icon: Receipt },
    calendario: { component: Calendario, name: 'Calendário Bazares', icon: Calendar },
    relatorios: { component: () => <div className="p-10">Relatórios Financeiros (Futuro)</div>, name: 'Relatórios', icon: BarChart3 },
    gestao_pecas: { component: GestaoPecas, name: 'Gestão de Inventário', icon: Box },

    config: { component: () => <div className="p-10">Configurações (Futuro)</div>, name: 'Configurações', icon: Settings },
};

type PageKey = keyof typeof pages;

const AdminLayout: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<PageKey>('dashboard');

    const ActiveComponent = pages[currentPage].component;

    const NavItem = ({ page, name, Icon }: { page: PageKey, name: string, Icon: React.ElementType }) => (
        <button
            onClick={() => setCurrentPage(page)}
            className={`flex items-center space-x-3 py-3 px-4 rounded-lg w-full transition-colors duration-200 ${currentPage === page
                    ? 'bg-cachos-dourado text-cachos-castanho font-semibold'
                    : 'text-gray-600 hover:bg-cachos-creme hover:text-cachos-castanho'
                }`}
        >
            <Icon size={20} />
            <span>{name}</span>
        </button>
    );

    return (
        <div className="flex min-h-screen bg-cachos-creme">

            <aside className="w-64 bg-white shadow-xl p-6 flex flex-col justify-between border-r border-gray-100">
                <div>
                    <h1 className="text-3xl font-extrabold text-cachos-castanho mb-10">
                        Cachos-Brechó
                    </h1>

                    <nav className="space-y-2">
                        {(Object.keys(pages) as PageKey[]).map(key => (
                            <NavItem
                                key={key}
                                page={key}
                                name={pages[key].name}
                                Icon={pages[key].icon}
                            />
                        ))}
                    </nav>
                </div>

                <div className="text-xs text-gray-400">
                    <p>Logado como: Jaya</p>
                    <p>&copy; 2025 Projeto Cachos-Brechó</p>
                </div>
            </aside>

            <main className="flex-1 overflow-y-auto">
                <div className="bg-cachos-creme min-h-full">
                    <ActiveComponent />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;