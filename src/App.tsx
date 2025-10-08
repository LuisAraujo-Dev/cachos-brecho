// src/App.tsx (Implementação do Roteamento)
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './pages/Dashboard/AdminLayout';
import VitrinePrincipal from './pages/Vitrine/VitrinePrincipal';
import GaleriaInspiracao from './pages/Vitrine/GaleriaInspiracao';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD; 
const LoginAdmin: React.FC = () => {
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            localStorage.setItem('adminToken', 'valid'); 
            window.location.reload(); 
        } else {
            alert('Senha incorreta.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-cachos-creme">
            <div className="p-8 bg-white shadow-xl rounded-lg border-t-4 border-cachos-dourado w-80">
                <h2 className="text-2xl font-bold text-cachos-castanho mb-6 text-center">Acesso Administrador</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="password"
                        placeholder="Digite a senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:border-cachos-dourado"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full py-3 bg-cachos-dourado text-cachos-castanho font-bold rounded-md hover:bg-cachos-dourado/80 transition"
                    >
                        Acessar Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const isAuthenticated = localStorage.getItem('adminToken') === 'valid';
    return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" replace />;
};

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<VitrinePrincipal />} />
            
            <Route path="/dicas" element={<GaleriaInspiracao />} />
            
            <Route path="/admin/login" element={<LoginAdmin />} />

            <Route 
                path="/admin/dashboard/*" 
                element={
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                } 
            />
            
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default App;