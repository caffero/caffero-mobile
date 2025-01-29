import { API_ENDPOINTS } from '../config';
import { CreateProduct } from '../models/Product';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

export const useProductService = () => {
    const { token } = useAuth();
    const { currentLanguage } = useLanguage();

    const getHeaders = (): HeadersInit => ({
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        'X-Language': currentLanguage?.id || 'tr'
    });

    return {
        async create(data: CreateProduct): Promise<void> {
            const response = await fetch(API_ENDPOINTS.PRODUCT.CREATE, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error('Failed to suggest product');
        }
    };
}; 