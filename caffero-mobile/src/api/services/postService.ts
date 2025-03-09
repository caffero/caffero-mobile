import { API_ENDPOINTS } from '../config';
import { GetPost, GetPostList, CreatePost, UpdatePost, DeletePost } from '../models/Post';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { ApiResponse } from '../models/ApiResponse';
import { ApiException } from 'exceptions';
import { cafferoBackendBuilder } from '../utils/CafferoBackendBuilder';

export const usePostService = () => {
    const { token } = useAuth();
    const { currentLanguage } = useLanguage();
    const apiClient = cafferoBackendBuilder()
        .withDefaultHeader('Authorization', token ? `Bearer ${token}` : '')
        .withDefaultHeader('X-Language', currentLanguage?.id || 'tr')
        .build();

    return {
        async getAll(): Promise<GetPostList[]> {
            try {
                const response = await apiClient
                    .get<ApiResponse<GetPostList[]>>(API_ENDPOINTS.POST.GET_ALL)
                    .execute();

                return response.result!.data;
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to fetch posts', 500, 'Unknown error');
            }
        },

        async getById(id: string): Promise<GetPost> {
            try {
                const url = API_ENDPOINTS.POST.GET.replace(':id', id);
                const response = await apiClient
                    .get<ApiResponse<GetPost>>(url)
                    .execute();

                return response.result!.data;
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to fetch post', 500, 'Unknown error');
            }
        },

        async create(data: CreatePost): Promise<GetPost> {
            try {
                const response = await apiClient
                    .post<ApiResponse<GetPost>>(API_ENDPOINTS.POST.CREATE, data)
                    .execute();

                return response.result!.data;
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to create post', 500, 'Unknown error');
            }
        },

        async update(data: UpdatePost): Promise<GetPost> {
            try {
                const url = API_ENDPOINTS.POST.UPDATE;
                const response = await apiClient
                    .put<ApiResponse<GetPost>>(url, data.id, data)
                    .execute();

                return response.result!.data;
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to update post', 500, 'Unknown error');
            }
        },

        async delete(data: DeletePost): Promise<void> {
            try {
                const url = API_ENDPOINTS.POST.DELETE;
                const response = await apiClient
                    .delete<ApiResponse<void>>(url, data.id)
                    .execute();
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to delete post', 500, 'Unknown error');
            }
        }
    };
};
