import { API_ENDPOINTS } from '../config';
import { CreateContact } from '../models/Contact';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

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
            if (!response.ok) throw new Error('Failed to submit contact form');
        }
    };
}; 