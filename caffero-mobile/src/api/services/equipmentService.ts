import { API_ENDPOINTS } from '../config';
import { GetEquipment, GetEquipmentList, CreateEquipment, UpdateEquipment, DeleteEquipment, GetEquipmentType } from '../models/Equipment';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { ApiResponse } from '../models/ApiResponse';
import { ApiException } from 'exceptions';
import { cafferoBackendBuilder } from '../utils/CafferoBackendBuilder';

export const useEquipmentService = () => {
    const { token } = useAuth();
    const { currentLanguage } = useLanguage();
    const apiClient = cafferoBackendBuilder()
        .withDefaultHeader('Authorization', token ? `Bearer ${token}` : '')
        .withDefaultHeader('X-Language', currentLanguage?.id || 'tr')
        .build();

    return {
        async getAll(): Promise<GetEquipmentList[]> {
            try {
                const response = await apiClient
                    .get<ApiResponse<GetEquipmentList[]>>(API_ENDPOINTS.EQUIPMENT.GET_ALL)
                    .execute();

                return response.result!.data;
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to fetch equipment list', 500, 'Unknown error');
            }
        },

        async getById(id: string): Promise<GetEquipment> {
            try {
                const url = API_ENDPOINTS.EQUIPMENT.GET.replace(':id', id);
                const response = await apiClient
                    .get<ApiResponse<GetEquipment>>(url)
                    .execute();

                console.log(response.result!.data);

                return response.result!.data;
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to fetch equipment', 500, 'Unknown error');
            }
        },

        async create(data: CreateEquipment): Promise<GetEquipment> {
            try {
                const response = await apiClient
                    .post<ApiResponse<GetEquipment>>(API_ENDPOINTS.EQUIPMENT.CREATE, data)
                    .execute();

                return response.result!.data;
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to create equipment', 500, 'Unknown error');
            }
        },

        async update(data: UpdateEquipment): Promise<GetEquipment> {
            try {
                const url = API_ENDPOINTS.EQUIPMENT.UPDATE;
                const response = await apiClient
                    .put<ApiResponse<GetEquipment>>(url, data.id, data)
                    .execute();

                return response.result!.data;
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to update equipment', 500, 'Unknown error');
            }
        },

        async delete(data: DeleteEquipment): Promise<void> {
            try {
                const url = API_ENDPOINTS.EQUIPMENT.DELETE;
                const response = await apiClient
                    .delete<ApiResponse<void>>(url, data.id)
                    .execute();
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to delete equipment', 500, 'Unknown error');
            }
        },

        async getEquipmentTypes(): Promise<GetEquipmentType[]> {
            const response = await apiClient
                .get<ApiResponse<GetEquipmentType[]>>(API_ENDPOINTS.EQUIPMENT.GET_TYPES)
                .execute();

            return response.result!.data;
        }
    };
}; 