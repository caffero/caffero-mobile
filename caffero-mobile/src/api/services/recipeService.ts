import { API_ENDPOINTS } from '../config';
import { GetRecipe, GetRecipeList, CreateRecipe, UpdateRecipe, DeleteRecipe } from '../models/Recipe';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

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
            if (!response.ok) throw new Error('Failed to fetch recipes');
            return response.json();
        },

        async getById(id: string): Promise<GetRecipe> {
            const response = await fetch(API_ENDPOINTS.RECIPE.GET.replace(':id', id), {
                method: 'GET',
                headers: getHeaders()
            });
            if (!response.ok) throw new Error('Failed to fetch recipe');
            return response.json();
        },

        async create(data: CreateRecipe): Promise<GetRecipe> {
            const response = await fetch(API_ENDPOINTS.RECIPE.CREATE, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error('Failed to create recipe');
            return response.json();
        },

        async update(data: UpdateRecipe): Promise<GetRecipe> {
            const response = await fetch(API_ENDPOINTS.RECIPE.UPDATE.replace(':id', data.id), {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error('Failed to update recipe');
            return response.json();
        },

        async delete(data: DeleteRecipe): Promise<void> {
            const response = await fetch(API_ENDPOINTS.RECIPE.DELETE.replace(':id', data.id), {
                method: 'DELETE',
                headers: getHeaders()
            });
            if (!response.ok) throw new Error('Failed to delete recipe');
        }
    };
}; 