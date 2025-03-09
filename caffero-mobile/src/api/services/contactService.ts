import { API_ENDPOINTS } from '../config';
import { CreateContact } from '../models/Contact';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { ApiResponse } from '../models/ApiResponse';
import { ApiException } from 'exceptions';
import { cafferoBackendBuilder } from '../utils/CafferoBackendBuilder';

export const useContactService = () => {
    const { token } = useAuth();
    const { currentLanguage } = useLanguage();
    const apiClient = cafferoBackendBuilder()
        .withDefaultHeader('Authorization', token ? `Bearer ${token}` : '')
        .withDefaultHeader('X-Language', currentLanguage?.id || 'tr')
        .build();

    return {
        async create(data: CreateContact): Promise<void> {
            try {
                const response = await apiClient
                    .post<ApiResponse<void>>(API_ENDPOINTS.CONTACT.CREATE, data)
                    .execute();
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to submit contact form', 500, 'Unknown error');
            }
        }
    };
}; 