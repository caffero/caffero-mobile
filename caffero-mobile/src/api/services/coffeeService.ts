import { API_ENDPOINTS } from '../config';
import { GetCoffee, GetCoffeeList, CreateCoffee, UpdateCoffee, DeleteCoffee } from '../models/Coffee';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { ApiResponse } from '../models/ApiResponse';
import { ApiException } from 'exceptions';
import { cafferoBackendBuilder } from '../utils/CafferoBackendBuilder';
import { RefreshTokenInterceptor } from '../utils/interceptors/refreshTokenInterceptor';

export const useCoffeeService = () => {
    const { token } = useAuth();
    const auth = useAuth();
    const { currentLanguage } = useLanguage();
    const apiClient = cafferoBackendBuilder()
        //.withDefaultHeader('Authorization', token ? `Bearer ${token}` : '')
        .withDefaultHeader('X-Language', currentLanguage?.id || 'tr')
        .withResponseInterceptor(new RefreshTokenInterceptor(auth))
        .build();

    return {
        async getAll(params: URLSearchParams | undefined = undefined): Promise<GetCoffeeList[]> {
            try {
                const url = `${API_ENDPOINTS.COFFEE.GET_ALL}?${params}`;
                const response = await apiClient
                    .get<ApiResponse<GetCoffeeList[]>>(url)
                    .withHeader('Authorization', token ? `${token}` : '')
                    .withHeader('Accept', '*/*')
                    .withHeader('Accept-Encoding', 'gzip, deflate, br')
                    .withHeader('Connection', 'keep-alive')
                    .execute();

                console.log(response.result!.pagination);

                return response.result!.data;
            } catch (error) {
                console.log("Error fetching coffees:", error);
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to fetch coffees', 500, 'Unknown error');
            }
        },

        async getById(id: string): Promise<GetCoffee> {
            try {
                const url = API_ENDPOINTS.COFFEE.GET.replace(':id', id);
                console.log(url);
                
                const response = await apiClient
                    .get<ApiResponse<GetCoffee>>(url)
                    .execute();

                return response.result!.data;
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to fetch coffee', 500, 'Unknown error');
            }
        },

        async create(data: CreateCoffee): Promise<GetCoffee> {
            try {
                const response = await apiClient
                    .post<ApiResponse<GetCoffee>>(API_ENDPOINTS.COFFEE.CREATE, data)
                    .execute();

                return response.result!.data;
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to create coffee', 500, 'Unknown error');
            }
        },

        async update(data: UpdateCoffee): Promise<GetCoffee> {
            try {
                const url = API_ENDPOINTS.COFFEE.UPDATE;
                const response = await apiClient
                    .put<ApiResponse<GetCoffee>>(url, data.id, data)
                    .execute();

                return response.result!.data;
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to update coffee', 500, 'Unknown error');
            }
        },

        async delete(data: DeleteCoffee): Promise<void> {
            try {
                const url = API_ENDPOINTS.COFFEE.DELETE;
                const response = await apiClient
                    .delete<ApiResponse<void>>(url, data.id)
                    .execute();
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to delete coffee', 500, 'Unknown error');
            }
        }
    };
}; 