import { API_ENDPOINTS } from '../config';
import { GetEquipment, GetEquipmentList, CreateEquipment, UpdateEquipment, DeleteEquipment } from '../models/Equipment';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { ApiResponse } from '../models/ApiResponse';
import { ApiException } from 'exceptions';

export const useEquipmentService = () => {
    const { token } = useAuth();
    const { currentLanguage } = useLanguage();

    const getHeaders = (): HeadersInit => ({
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        'X-Language': currentLanguage?.id || 'tr'
    });

    return {
        async getAll(): Promise<GetEquipmentList[]> {
            const response = await fetch(API_ENDPOINTS.EQUIPMENT.GET_ALL, {
                method: 'GET',
                headers: getHeaders()
            });

            const result: ApiResponse<GetEquipmentList[]> = await response.json();

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Failed to fetch equipment list',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }

            return result.result.data;
        },

        async getById(id: string): Promise<GetEquipment> {
            const response = await fetch(API_ENDPOINTS.EQUIPMENT.GET.replace(':id', id), {
                method: 'GET',
                headers: getHeaders()
            });

            const result: ApiResponse<GetEquipment> = await response.json();

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Failed to fetch equipment',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }

            return result.result.data;
        },

        async create(data: CreateEquipment): Promise<GetEquipment> {
            const response = await fetch(API_ENDPOINTS.EQUIPMENT.CREATE, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data)
            });

            const result: ApiResponse<GetEquipment> = await response.json();

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Failed to create equipment',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }

            return result.result.data;
        },

        async update(data: UpdateEquipment): Promise<GetEquipment> {
            const response = await fetch(API_ENDPOINTS.EQUIPMENT.UPDATE.replace(':id', data.id), {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(data)
            });

            const result: ApiResponse<GetEquipment> = await response.json();

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Failed to update equipment',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }

            return result.result.data;
        },

        async delete(data: DeleteEquipment): Promise<void> {
            const response = await fetch(API_ENDPOINTS.EQUIPMENT.DELETE.replace(':id', data.id), {
                method: 'DELETE',
                headers: getHeaders()
            });

            const result: ApiResponse<void> = await response.json();

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Failed to delete equipment',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }
        }
    };
}; 