import { API_ENDPOINTS } from '../config';
import { GetRecipe, GetRecipeList, CreateRecipe, UpdateRecipe, DeleteRecipe } from '../models/Recipe';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { ApiResponse } from '../models/ApiResponse';
import { ApiException } from 'exceptions';

export const useRecipeService = () => {
    const { token } = useAuth();
    const { currentLanguage } = useLanguage();

    const getHeaders = (): HeadersInit => ({
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        'X-Language': currentLanguage?.id || 'tr'
    });

    return {
        async getAll(): Promise<GetRecipeList[]> {
            const response = await fetch(API_ENDPOINTS.RECIPE.GET_ALL, {
                method: 'GET',
                headers: getHeaders()
            });

            const result: ApiResponse<GetRecipeList[]> = await response.json();

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Failed to fetch recipes',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }

            return result.result.data;
        },

        async getById(id: string): Promise<GetRecipe> {
            const response = await fetch(API_ENDPOINTS.RECIPE.GET.replace(':id', id), {
                method: 'GET',
                headers: getHeaders()
            });

            const result: ApiResponse<GetRecipe> = await response.json();

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Failed to fetch recipe',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }

            return result.result.data;
        },

        async create(data: CreateRecipe): Promise<GetRecipe> {
            const response = await fetch(API_ENDPOINTS.RECIPE.CREATE, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data)
            });

            const result: ApiResponse<GetRecipe> = await response.json();

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Failed to create recipe',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }

            return result.result.data;
        },

        async update(data: UpdateRecipe): Promise<GetRecipe> {
            const response = await fetch(API_ENDPOINTS.RECIPE.UPDATE.replace(':id', data.id), {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(data)
            });

            const result: ApiResponse<GetRecipe> = await response.json();

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Failed to update recipe',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }

            return result.result.data;
        },

        async delete(data: DeleteRecipe): Promise<void> {
            const response = await fetch(API_ENDPOINTS.RECIPE.DELETE.replace(':id', data.id), {
                method: 'DELETE',
                headers: getHeaders()
            });

            const result: ApiResponse<void> = await response.json();

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Failed to delete recipe',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }
        }
    };
}; 