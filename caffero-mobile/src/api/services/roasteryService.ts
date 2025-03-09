import { API_ENDPOINTS } from '../config';
import { GetRoastery, GetRoasteryList, CreateRoastery, UpdateRoastery, DeleteRoastery, GetRoasteryBeans } from '../models/Roastery';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { ApiResponse } from '../models/ApiResponse';
import { ApiException } from 'exceptions';
import { cafferoBackendBuilder } from '../utils/CafferoBackendBuilder';

export const useRoasteryService = () => {
    const { token } = useAuth();
    const { currentLanguage } = useLanguage();
    const apiClient = cafferoBackendBuilder()
        .withDefaultHeader('Authorization', token ? `Bearer ${token}` : '')
        .withDefaultHeader('X-Language', currentLanguage?.id || 'tr')
        .build();

    return {
        async getAll(): Promise<GetRoasteryList[]> {
            try {
                const response = await apiClient
                    .get<ApiResponse<GetRoasteryList[]>>(API_ENDPOINTS.ROASTERY.GET_ALL)
                    .execute();

                return response.result!.data;
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to fetch roasteries', 500, 'Unknown error');
            }
        },

        async getById(id: string): Promise<GetRoastery> {
            try {
                const url = API_ENDPOINTS.ROASTERY.GET.replace(':id', id);
                const response = await apiClient
                    .get<ApiResponse<GetRoastery>>(url)
                    .execute();

                return response.result!.data;
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to fetch roastery', 500, 'Unknown error');
            }
        },

        async getBeans(id: string): Promise<GetRoasteryBeans> {
            const url = API_ENDPOINTS.ROASTERY.BEANS.replace(':id', id);
            const response = await apiClient.get<ApiResponse<GetRoasteryBeans>>(url).execute();
            return response.result!.data;
        },

        async create(data: CreateRoastery): Promise<GetRoastery> {
            try {
                const response = await apiClient
                    .post<ApiResponse<GetRoastery>>(API_ENDPOINTS.ROASTERY.CREATE, data)
                    .execute();

                return response.result!.data;
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to create roastery', 500, 'Unknown error');
            }
        },

        async update(data: UpdateRoastery): Promise<GetRoastery> {
            try {
                const url = API_ENDPOINTS.ROASTERY.UPDATE;
                const response = await apiClient
                    .put<ApiResponse<GetRoastery>>(url, data.id, data)
                    .execute();

                return response.result!.data;
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to update roastery', 500, 'Unknown error');
            }
        },

        async delete(data: DeleteRoastery): Promise<void> {
            try {
                const url = API_ENDPOINTS.ROASTERY.DELETE;
                const response = await apiClient
                    .delete<ApiResponse<void>>(url, data.id)
                    .execute();
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to delete roastery', 500, 'Unknown error');
            }
        }
    };
};
