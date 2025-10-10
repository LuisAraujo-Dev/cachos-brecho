// src/pages/Vitrine/VitrinePrincipal.tsx
import React, { useState } from 'react';
import { useFetchData } from '../../utils/api';
import { ShoppingBag, Search, RefreshCw, X } from 'lucide-react';
import type { Peca } from '../../types/Peca';

const API_ENDPOINT = 'pecas'; 
const VitrinePrincipal: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { data: pecas, loading, error, refresh } = useFetchData<Peca[]>(API_ENDPOINT);

    const pecasList = pecas || [];

    const filteredPecas = pecasList
        .filter(peca => peca.status === 'Pronta p/ Consignação') 
        .filter(peca => {
            const searchLower = searchTerm.toLowerCase();
            return peca.nome.toLowerCase().includes(searchLower) ||
                   peca.descricao?.toLowerCase().includes(searchLower) ||
                   peca.corPrincipal.toLowerCase().includes(searchLower);
        });

    const handleBuyClick = (peca: Peca) => {
        const message = `Oi Jaya, tenho interesse na peça ${peca.nome} (${peca.corPrincipal}, ${peca.tamanhoId}). Ela ainda está disponível?`;
        const whatsappUrl = `https://wa.me/5561993605595?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    if (loading) return <div className="text-center p-10 text-[var(--color-castanho)]">Carregando Vitrine...</div>;
    if (error) return <div className="text-center p-10 text-red-600 bg-red-100 rounded-lg">Erro ao carregar a vitrine.</div>;

    return (
        <div className="min-h-screen bg-[var(--color-creme)]">
            
            <header className="bg-white shadow-md sticky top-0 z-10">
                <div className="max-w-7xl mx-auto p-6 flex justify-between items-center">
                    <h1 className="text-3xl font-extrabold text-[var(--color-castanho)]">
                        Cachos-Brechó <span className="text-[var(--color-salvia)]">Vitrine</span>
                    </h1>
                    
                    <div className="relative w-full max-w-lg flex">
                        <input
                            type="text"
                            placeholder="Buscar vestidos, calças, azul..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-2 pl-10 border border-gray-300 rounded-l-md focus:ring-[var(--color-dourado)] focus:border-[var(--color-dourado)]"
                        />
                        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <button onClick={refresh} className="p-2 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200">
                             <RefreshCw size={20} className="text-[var(--color-castanho)]" />
                        </button>
                    </div>
                </div>
            </header>
            
            <div className="max-w-7xl mx-auto p-8">
                <h2 className="text-2xl font-bold text-[var(--color-castanho)] mb-6">
                    Achados do Dia ({filteredPecas.length} Peças)
                </h2>

                {filteredPecas.length === 0 && (
                     <div className="text-center p-20 text-gray-500 bg-white rounded-lg border border-dashed border-[var(--color-castanho)]/20">
                         <X size={32} className="mx-auto mb-4" />
                         <p>Nenhuma peça à venda encontrada. Volte mais tarde para garimpar!</p>
                     </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredPecas.map((peca) => (
                        <div key={peca.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-[1.02]">
                            
                            <div className="h-60 bg-gray-200 flex items-center justify-center text-gray-500">
                                Imagem da Peça #{peca.id}
                            </div>
                            
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-[var(--color-castanho)] truncate">{peca.nome}</h3>
                                <p className="text-sm text-gray-500 mb-2">{peca.corPrincipal} | Tam: {peca.tamanhoId}</p>

                                <div className="text-2xl font-bold text-green-600 mb-3">
                                    R$ {peca.precoVenda?.toFixed(2) || 'N/D'}
                                </div>
                                
                                <button
                                    onClick={() => handleBuyClick(peca)}
                                    className="w-full py-2 bg-[var(--color-salvia)] text-white font-bold rounded-md flex items-center justify-center space-x-2 hover:bg-[var(--color-salvia)90] transition duration-200"
                                >
                                    <ShoppingBag size={18} />
                                    <span>Tenho Interesse!</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VitrinePrincipal;