import { API_ENDPOINTS } from '../config';
import { GetUser, UpdateUser, DeleteUser } from '../models/User';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { ApiResponse } from '../models/ApiResponse';
import { ApiException } from 'exceptions';

export const useUserService = () => {
    const { token } = useAuth();
    const { currentLanguage } = useLanguage();

    const getHeaders = (): HeadersInit => ({
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        'X-Language': currentLanguage?.id || 'tr'
    });

    return {
        async getById(id: string): Promise<GetUser> {
            const response = await fetch(API_ENDPOINTS.USER.GET.replace(':id', id), {
                method: 'GET',
                headers: getHeaders()
            });

            const result: ApiResponse<GetUser> = await response.json();

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Failed to fetch user',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }

            return result.result.data;
        },

        async update(data: UpdateUser): Promise<GetUser> {
            const response = await fetch(API_ENDPOINTS.USER.UPDATE.replace(':id', data.id), {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(data)
            });

            const result: ApiResponse<GetUser> = await response.json();

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Failed to update user',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }

            return result.result.data;
        },

        async delete(data: DeleteUser): Promise<void> {
            const response = await fetch(API_ENDPOINTS.USER.DELETE.replace(':id', data.id), {
                method: 'DELETE',
                headers: getHeaders()
            });

            const result: ApiResponse<void> = await response.json();

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Failed to delete user',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }
        }
    };
}; 