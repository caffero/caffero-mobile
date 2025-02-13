import { API_ENDPOINTS } from '../config';
import { CreateContact } from '../models/Contact';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { ApiResponse } from '../models/ApiResponse';
import { ApiException } from 'exceptions';

export const useContactService = () => {
    const { token } = useAuth();
    const { currentLanguage } = useLanguage();

    const getHeaders = (): HeadersInit => ({
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        'X-Language': currentLanguage?.id || 'tr'
    });

    return {
        async create(data: CreateContact): Promise<void> {
            const response = await fetch(API_ENDPOINTS.CONTACT.CREATE, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data)
            });

            const result: ApiResponse<void> = await response.json();

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Failed to submit contact form',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }
        }
    };
}; 