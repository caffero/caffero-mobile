import { API_ENDPOINTS } from '../config';
import { GetCoffeeBean, GetCoffeeBeanList, CreateCoffeeBean, UpdateCoffeeBean, DeleteCoffeeBean } from '../models/CoffeeBean';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { ApiResponse } from '../models/ApiResponse';
import { ApiException } from 'exceptions';
import { cafferoBackendBuilder } from '../utils/CafferoBackendBuilder';

export const useCoffeeBeanService = () => {
    const { token } = useAuth();
    const { currentLanguage } = useLanguage();
    const apiClient = cafferoBackendBuilder()
        .withDefaultHeader('Authorization', token ? `Bearer ${token}` : '')
        .withDefaultHeader('X-Language', currentLanguage?.id || 'tr')
        .build();

    return {
        async getAll(): Promise<GetCoffeeBeanList[]> {
            try {
                const response = await apiClient
                    .get<ApiResponse<GetCoffeeBeanList[]>>(API_ENDPOINTS.COFFEE_BEAN.GET_ALL)
                    .execute();

                return response.result!.data;
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to fetch coffee beans', 500, 'Unknown error');
            }
        },

        async getById(id: string): Promise<GetCoffeeBean> {
            try {
                const url = API_ENDPOINTS.COFFEE_BEAN.GET.replace(':id', id);
                const response = await apiClient
                    .get<ApiResponse<GetCoffeeBean>>(url)
                    .execute();

                return response.result!.data;
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to fetch coffee bean', 500, 'Unknown error');
            }
        },

        async create(data: CreateCoffeeBean): Promise<GetCoffeeBean> {
            try {
                const response = await apiClient
                    .post<ApiResponse<GetCoffeeBean>>(API_ENDPOINTS.COFFEE_BEAN.CREATE, data)
                    .execute();

                return response.result!.data;
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to create coffee bean', 500, 'Unknown error');
            }
        },

        async update(data: UpdateCoffeeBean): Promise<GetCoffeeBean> {
            try {
                const url = API_ENDPOINTS.COFFEE_BEAN.UPDATE;
                const response = await apiClient
                    .put<ApiResponse<GetCoffeeBean>>(url, data.id, data)
                    .execute();

                return response.result!.data;
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to update coffee bean', 500, 'Unknown error');
            }
        },

        async delete(data: DeleteCoffeeBean): Promise<void> {
            try {
                const url = API_ENDPOINTS.COFFEE_BEAN.DELETE.replace(':id', data.id);
                const response = await apiClient
                    .delete<ApiResponse<void>>(url, data.id)
                    .execute();
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to delete coffee bean', 500, 'Unknown error');
            }
        }
    };
}; 