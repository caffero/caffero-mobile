import { ApiException } from 'exceptions';
import { API_ENDPOINTS } from '../config';
import { ApiResponse } from '../models/ApiResponse';
import { UserCoin, UpdateUserCoinRequest } from '../models/UserCoin';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { cafferoBackendBuilder } from '../utils/CafferoBackendBuilder';

export const useCoinService = () => {
    const { token } = useAuth();
    const { currentLanguage } = useLanguage();
    const apiClient = cafferoBackendBuilder()
        .withDefaultHeader('X-Language', currentLanguage?.id || 'tr')
        .withDefaultHeader('Authorization', token ? `Bearer ${token}` : '')
        .build();

    return {
        async getCurrentUserCoins(): Promise<UserCoin> {
            try {
                const response = await apiClient
                    .get<ApiResponse<UserCoin>>(API_ENDPOINTS.COIN.GET_CURRENT_USER)
                    .execute();

                return response.result!.data;
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to get user coins', 500, 'Unknown error');
            }
        },

        async increaseUserCoins(request: UpdateUserCoinRequest): Promise<UserCoin> {
            try {
                const response = await apiClient
                    .post<ApiResponse<UserCoin>>(API_ENDPOINTS.COIN.INCREASE, request)
                    .execute();

                return response.result!.data;
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to increase user coins', 500, 'Unknown error');
            }
        },

        async decreaseUserCoins(request: UpdateUserCoinRequest): Promise<UserCoin> {
            try {
                const response = await apiClient
                    .post<ApiResponse<UserCoin>>(API_ENDPOINTS.COIN.DECREASE, request)
                    .execute();

                return response.result!.data;
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to decrease user coins', 500, 'Unknown error');
            }
        }
    };
}; 
