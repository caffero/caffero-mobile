import { API_ENDPOINTS } from '../config';
import { CreateProduct } from '../models/Product';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { ApiResponse } from '../models/ApiResponse';
import { ApiException } from 'exceptions';
import { cafferoBackendBuilder } from '../utils/CafferoBackendBuilder';

export const useProductService = () => {
    const { token } = useAuth();
    const { currentLanguage } = useLanguage();
    const apiClient = cafferoBackendBuilder()
        .withDefaultHeader('Authorization', token ? `Bearer ${token}` : '')
        .withDefaultHeader('X-Language', currentLanguage?.id || 'tr')
        .build();

    return {
        async create(data: CreateProduct): Promise<void> {
            try {
                const response = await apiClient
                    .post<ApiResponse<void>>(API_ENDPOINTS.PRODUCT.CREATE, data)
                    .execute();
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to suggest product', 500, 'Unknown error');
            }
        }
    };
}; 