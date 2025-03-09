import { API_ENDPOINTS } from '../config';
import { GetRecipe, GetRecipeList, CreateRecipe, UpdateRecipe, DeleteRecipe } from '../models/Recipe';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { ApiResponse } from '../models/ApiResponse';
import { ApiException } from 'exceptions';
import { cafferoBackendBuilder } from '../utils/CafferoBackendBuilder';

export const useRecipeService = () => {
    const { token } = useAuth();
    const { currentLanguage } = useLanguage();
    const apiClient = cafferoBackendBuilder()
        .withDefaultHeader('Authorization', token ? `Bearer ${token}` : '')
        .withDefaultHeader('X-Language', currentLanguage?.id || 'tr')
        .build();

    return {
        async getAll(): Promise<GetRecipeList[]> {
            try {
                const response = await apiClient
                    .get<ApiResponse<GetRecipeList[]>>(API_ENDPOINTS.RECIPE.GET_ALL)
                    .execute();

                return response.result!.data;
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to fetch recipes', 500, 'Unknown error');
            }
        },

        async getById(id: string): Promise<GetRecipe> {
            try {
                const url = API_ENDPOINTS.RECIPE.GET.replace(':id', id);
                const response = await apiClient
                    .get<ApiResponse<GetRecipe>>(url)
                    .execute();

                return response.result!.data;
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to fetch recipe', 500, 'Unknown error');
            }
        },

        async create(data: CreateRecipe): Promise<GetRecipe> {
            try {
                const response = await apiClient
                    .post<ApiResponse<GetRecipe>>(API_ENDPOINTS.RECIPE.CREATE, data)
                    .execute();

                return response.result!.data;
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to create recipe', 500, 'Unknown error');
            }
        },

        async update(data: UpdateRecipe): Promise<GetRecipe> {
            try {
                const url = API_ENDPOINTS.RECIPE.UPDATE;
                const response = await apiClient
                    .put<ApiResponse<GetRecipe>>(url, data.id, data)
                    .execute();

                return response.result!.data;
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to update recipe', 500, 'Unknown error');
            }
        },

        async delete(data: DeleteRecipe): Promise<void> {
            try {
                const url = API_ENDPOINTS.RECIPE.DELETE;
                const response = await apiClient
                    .delete<ApiResponse<void>>(url, data.id)
                    .execute();
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to delete recipe', 500, 'Unknown error');
            }
        }
    };
}; 