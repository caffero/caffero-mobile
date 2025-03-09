import { API_ENDPOINTS } from '../config';
import { GetUser, UpdateUser, DeleteUser } from '../models/User';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { ApiResponse } from '../models/ApiResponse';
import { ApiException } from 'exceptions';
import { cafferoBackendBuilder } from '../utils/CafferoBackendBuilder';

export const useUserService = () => {
    const { token } = useAuth();
    const { currentLanguage } = useLanguage();
    const apiClient = cafferoBackendBuilder()
        .withDefaultHeader('Authorization', token ? `Bearer ${token}` : '')
        .withDefaultHeader('X-Language', currentLanguage?.id || 'tr')
        .build();

    return {
        async getById(id: string): Promise<GetUser> {
            try {
                const url = API_ENDPOINTS.USER.GET.replace(':id', id);
                const response = await apiClient
                    .get<ApiResponse<GetUser>>(url)
                    .execute();

                return response.result!.data;
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to fetch user', 500, 'Unknown error');
            }
        },

        async update(data: UpdateUser): Promise<GetUser> {
            try {
                const url = API_ENDPOINTS.USER.UPDATE;
                const response = await apiClient
                    .put<ApiResponse<GetUser>>(url, data.id, data)
                    .execute();

                return response.result!.data;
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to update user', 500, 'Unknown error');
            }
        },

        async delete(data: DeleteUser): Promise<void> {
            try {
                const url = API_ENDPOINTS.USER.DELETE;
                const response = await apiClient
                    .delete<ApiResponse<void>>(url, data.id)
                    .execute();
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to delete user', 500, 'Unknown error');
            }
        }
    };
}; 