import { API_ENDPOINTS } from '../config';
import { GetUser, UpdateUser, DeleteUser } from '../models/User';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

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
            if (!response.ok) throw new Error('Failed to fetch user');
            return response.json();
        },

        async update(data: UpdateUser): Promise<GetUser> {
            const response = await fetch(API_ENDPOINTS.USER.UPDATE.replace(':id', data.id), {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error('Failed to update user');
            return response.json();
        },

        async delete(data: DeleteUser): Promise<void> {
            const response = await fetch(API_ENDPOINTS.USER.DELETE.replace(':id', data.id), {
                method: 'DELETE',
                headers: getHeaders()
            });
            if (!response.ok) throw new Error('Failed to delete user');
        }
    };
}; 