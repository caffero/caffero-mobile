import { API_ENDPOINTS } from '../config';
import { GetCoffeeBean, GetCoffeeBeanList, CreateCoffeeBean, UpdateCoffeeBean, DeleteCoffeeBean } from '../models/CoffeeBean';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

export const useCoffeeBeanService = () => {
    const { token } = useAuth();
    const { currentLanguage } = useLanguage();

    const getHeaders = (): HeadersInit => ({
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        'X-Language': currentLanguage?.id || 'tr'
    });

    return {
        async getAll(): Promise<GetCoffeeBeanList[]> {
            const response = await fetch(API_ENDPOINTS.COFFEE_BEAN.GET_ALL, {
                method: 'GET',
                headers: getHeaders()
            });
            if (!response.ok) throw new Error('Failed to fetch coffee beans');
            return response.json();
        },

        async getById(id: string): Promise<GetCoffeeBean> {
            const response = await fetch(API_ENDPOINTS.COFFEE_BEAN.GET.replace(':id', id), {
                method: 'GET',
                headers: getHeaders()
            });
            if (!response.ok) throw new Error('Failed to fetch coffee bean');
            return response.json();
        },

        async create(data: CreateCoffeeBean): Promise<GetCoffeeBean> {
            const response = await fetch(API_ENDPOINTS.COFFEE_BEAN.CREATE, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error('Failed to create coffee bean');
            return response.json();
        },

        async update(data: UpdateCoffeeBean): Promise<GetCoffeeBean> {
            const response = await fetch(API_ENDPOINTS.COFFEE_BEAN.UPDATE.replace(':id', data.id), {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error('Failed to update coffee bean');
            return response.json();
        },

        async delete(data: DeleteCoffeeBean): Promise<void> {
            const response = await fetch(API_ENDPOINTS.COFFEE_BEAN.DELETE.replace(':id', data.id), {
                method: 'DELETE',
                headers: getHeaders()
            });
            if (!response.ok) throw new Error('Failed to delete coffee bean');
        }
    };
}; 