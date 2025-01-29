import { API_ENDPOINTS } from '../config';
import { GetEquipment, GetEquipmentList, CreateEquipment, UpdateEquipment, DeleteEquipment } from '../models/Equipment';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

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
            if (!response.ok) throw new Error('Failed to fetch equipment list');
            return response.json();
        },

        async getById(id: string): Promise<GetEquipment> {
            const response = await fetch(API_ENDPOINTS.EQUIPMENT.GET.replace(':id', id), {
                method: 'GET',
                headers: getHeaders()
            });
            if (!response.ok) throw new Error('Failed to fetch equipment');
            return response.json();
        },

        async create(data: CreateEquipment): Promise<GetEquipment> {
            const response = await fetch(API_ENDPOINTS.EQUIPMENT.CREATE, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error('Failed to create equipment');
            return response.json();
        },

        async update(data: UpdateEquipment): Promise<GetEquipment> {
            const response = await fetch(API_ENDPOINTS.EQUIPMENT.UPDATE.replace(':id', data.id), {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error('Failed to update equipment');
            return response.json();
        },

        async delete(data: DeleteEquipment): Promise<void> {
            const response = await fetch(API_ENDPOINTS.EQUIPMENT.DELETE.replace(':id', data.id), {
                method: 'DELETE',
                headers: getHeaders()
            });
            if (!response.ok) throw new Error('Failed to delete equipment');
        }
    };
}; 