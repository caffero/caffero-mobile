import { API_BASE_URL, API_ENDPOINTS } from '../config';
import { GetCoffee, GetCoffeeList, CreateCoffee, UpdateCoffee, DeleteCoffee } from '../models/Coffee';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { ApiResponse } from '../models/ApiResponse';
import { ApiException } from 'exceptions';

export const useCoffeeService = () => {
    const { token } = useAuth();
    const { currentLanguage } = useLanguage();

    const getHeaders = (): HeadersInit => ({
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        'X-Language': currentLanguage?.id || 'tr'
    });

    return {
        async getAll(params: URLSearchParams | undefined = undefined): Promise<GetCoffeeList[]> {
            var url = `${API_BASE_URL}${API_ENDPOINTS.COFFEE.GET_ALL}?${params}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: getHeaders()
            });

            console.log(getHeaders());

            const result: ApiResponse<GetCoffeeList[]> = await response.json();

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Failed to fetch coffees',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }

            return result.result.data;
        },

        async getById(id: string): Promise<GetCoffee> {
            var url = `${API_BASE_URL}${API_ENDPOINTS.COFFEE.GET.replace(':id', id)}`;

            console.log(url);
            const response = await fetch(url, {
                method: 'GET',
                headers: getHeaders()
            });

            console.log(getHeaders());

            const result: ApiResponse<GetCoffee> = await response.json();
            console.log(result);

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Failed to fetch coffee',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }

            return result.result.data;
        },

        async create(data: CreateCoffee): Promise<GetCoffee> {
            var url = `${API_BASE_URL}${API_ENDPOINTS.COFFEE.CREATE}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data)
            });
            console.log(getHeaders());

            const result: ApiResponse<GetCoffee> = await response.json();
            console.log(result);

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Failed to create coffee',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }

            return result.result.data;
        },

        async update(data: UpdateCoffee): Promise<GetCoffee> {
            var url = `${API_BASE_URL}${API_ENDPOINTS.COFFEE.UPDATE.replace(':id', data.id)}`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(data)
            });

            const result: ApiResponse<GetCoffee> = await response.json();

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Failed to update coffee',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }

            return result.result.data;
        },

        async delete(data: DeleteCoffee): Promise<void> {
            var url = `${API_BASE_URL}${API_ENDPOINTS.COFFEE.DELETE.replace(':id', data.id)}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: getHeaders()
            });

            const result: ApiResponse<void> = await response.json();

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Failed to delete coffee',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }
        }
    };
}; 