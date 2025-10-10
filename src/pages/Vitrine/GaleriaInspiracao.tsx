// src/pages/Vitrine/GaleriaInspiracao.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Hand, WashingMachine, Shirt, Wrench } from 'lucide-react';

const DicasCard: React.FC<{ title: string, icon: React.ElementType, content: string }> = ({ title, icon: Icon, content }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-[var(--color-salvia)]">
        <Icon size={32} className="text-[var(--color-salvia)] mb-3" />
        <h3 className="text-xl font-bold text-[var(--color-castanho)] mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{content}</p>
    </div>
);

const GaleriaInspiracao: React.FC = () => {
    return (
        <div className="min-h-screen bg-[var(--color-creme)] pt-10">
            <div className="max-w-4xl mx-auto p-8 bg-white shadow-2xl rounded-xl">
                <Link to="/" className="text-[var(--color-dourado)] hover:text-[var(--color-castanho)] mb-4 inline-flex items-center space-x-1">
                    &larr; Voltar para a Vitrine
                </Link>
                <h1 className="text-4xl font-extrabold text-[var(--color-castanho)] mb-6 border-b-2 border-[var(--color-dourado)] pb-3">
                    Galeria de Inspiração & Dicas de Cuidado (RF.VIT.05)
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    A moda sustentável exige carinho! Aprenda a maximizar a vida útil de seus achados e a cuidar de tecidos especiais.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DicasCard 
                        title="Lavagem de Linho e Seda"
                        icon={WashingMachine}
                        content="Sempre lave à mão com água fria e sabão neutro. Nunca torça o linho; apenas pressione para remover o excesso de água. Seda, seque na sombra para evitar marcas d'água."
                    />
                    <DicasCard 
                        title="Remoção de Manchas de Óleo"
                        icon={Hand}
                        content="Aplique bicarbonato de sódio ou talco sobre a mancha de óleo imediatamente. Deixe agir por horas para absorver a gordura antes de lavar normalmente com detergente."
                    />
                    <DicasCard 
                        title="Revitalização de Peças Escuras"
                        icon={Shirt}
                        content="Para evitar que roupas pretas desbotem, adicione uma xícara de vinagre branco no ciclo de enxágue. Isso sela a cor e remove resíduos de sabão."
                    />
                    <DicasCard 
                        title="O Poder do Vapor"
                        icon={Wrench}
                        content="Use um vaporizador em vez de ferro em lã e tricô. O vapor não achata as fibras, revitalizando o caimento da peça e eliminando odores."
                    />
                </div>
            </div>
        </div>
    );
};

export default GaleriaInspiracao;