const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Função utilitária genérica para fazer requisições POST para a API.
 * @param endpoint - O caminho da API (ex: 'pecas' ou 'eventos').
 * @param data - O objeto com a tipagem genérica T (segura).
 * @returns O objeto de resposta da API (ou lança um erro).
 */
export async function postData<T, D>(endpoint: string, data: D): Promise<T> {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erro HTTP: ${response.status}`);
    }

    return response.json() as Promise<T>;
}