import React, { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import DashboardPrincipal from './DashboardPrincipal';
import CadastroPeca from './CadastroPeca';
import GestaoPecas from './Inventario/GestaoPecas'; 
import ControleDespesas from './Financas/ControleDespesas'; 
import Calendario from './Eventos/Calendario';

import { LayoutDashboard, Calendar, Settings, BarChart3, DollarSign, Receipt, Box } from 'lucide-react';

const pages = {
    dashboard: { component: DashboardPrincipal, name: 'Dashboard Geral', icon: LayoutDashboard },
    gestao: { component: GestaoPecas, name: 'Gestão de Inventário', icon: Box },
    cadastro: { component: CadastroPeca, name: 'Novo Cadastro', icon: DollarSign },
    
    despesas: { component: ControleDespesas, name: 'Controle de Despesas', icon: Receipt },
    
    calendario: { component: Calendario, name: 'Calendário Bazares', icon: Calendar },
    
    relatorios: { component: () => <div className="p-10">Relatórios Financeiros (Futuro)</div>, name: 'Relatórios', icon: BarChart3 },
    config: { component: () => <div className="p-10">Configurações (Futuro)</div>, name: 'Configurações', icon: Settings },
};

type PageKey = keyof typeof pages;

const AdminLayout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { currentPageKey, ActiveComponent } = useMemo(() => {
        const currentPath = location.pathname.split('/').pop() || 'dashboard'; 
        
        const key = (Object.keys(pages) as PageKey[]).find(k => k === currentPath) || 'dashboard';
        
        return {
            currentPageKey: key,
            ActiveComponent: pages[key].component,
        };
    }, [location.pathname]);

    const NavItem = ({ page, name, Icon }: { page: PageKey, name: string, Icon: React.ElementType }) => {
        
        const handleClick = () => {
            navigate(`/admin/dashboard/${page}`); 
        };
        return (
            <button
                onClick={handleClick}
                className={`flex items-center space-x-3 py-3 px-4 rounded-lg w-full transition-colors duration-200 ${
                    currentPageKey === page 
                        ? 'bg-cachos-dourado text-[var(--color-castanho)] font-semibold'
                        : 'text-gray-600 hover:bg-cachos-creme hover:text-[var(--color-castanho)]'
                }`}
            >
                <Icon size={20} />
                <span>{name}</span>
            </button>
        );
    };

    return (
        <div className="flex min-h-screen bg-cachos-creme">
            
            <aside className="w-64 bg-white shadow-xl p-6 flex flex-col justify-between border-r border-gray-100">
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