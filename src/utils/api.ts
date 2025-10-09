import { useState, useCallback, useEffect } from "react";

const API_BASE_URL = 'http://localhost:3000/api';

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

export async function getAllData<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erro HTTP: ${response.status}`);
    }
    return response.json() as Promise<T>;
}

export const useFetchData = <T>(endpoint: string) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getAllData<T>(endpoint);
            setData(result);
        } catch (err) {
            setError("Falha ao carregar os dados.");
            console.error('Fetch Error:', err);
        } finally {
            setLoading(false);
        }
    }, [endpoint]); 

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refresh: fetchData };
};

export async function deleteData(endpoint: string, id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${endpoint}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erro HTTP: ${response.status}`);
    }
}