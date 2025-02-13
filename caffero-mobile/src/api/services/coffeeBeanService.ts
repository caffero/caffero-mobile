import { API_ENDPOINTS } from '../config';
import { GetCoffeeBean, GetCoffeeBeanList, CreateCoffeeBean, UpdateCoffeeBean, DeleteCoffeeBean } from '../models/CoffeeBean';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { ApiResponse } from '../models/ApiResponse';
import { ApiException } from 'exceptions';

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

            const result: ApiResponse<GetCoffeeBeanList[]> = await response.json();

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Failed to fetch coffee beans',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }

            return result.result.data;
        },

        async getById(id: string): Promise<GetCoffeeBean> {
            const response = await fetch(API_ENDPOINTS.COFFEE_BEAN.GET.replace(':id', id), {
                method: 'GET',
                headers: getHeaders()
            });

            const result: ApiResponse<GetCoffeeBean> = await response.json();

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Failed to fetch coffee bean',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }

            return result.result.data;
        },

        async create(data: CreateCoffeeBean): Promise<GetCoffeeBean> {
            const response = await fetch(API_ENDPOINTS.COFFEE_BEAN.CREATE, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data)
            });

            const result: ApiResponse<GetCoffeeBean> = await response.json();

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Failed to create coffee bean',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }

            return result.result.data;
        },

        async update(data: UpdateCoffeeBean): Promise<GetCoffeeBean> {
            const response = await fetch(API_ENDPOINTS.COFFEE_BEAN.UPDATE.replace(':id', data.id), {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(data)
            });

            const result: ApiResponse<GetCoffeeBean> = await response.json();

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Failed to update coffee bean',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }

            return result.result.data;
        },

        async delete(data: DeleteCoffeeBean): Promise<void> {
            const response = await fetch(API_ENDPOINTS.COFFEE_BEAN.DELETE.replace(':id', data.id), {
                method: 'DELETE',
                headers: getHeaders()
            });

            const result: ApiResponse<void> = await response.json();

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Failed to delete coffee bean',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }
        }
    };
}; 