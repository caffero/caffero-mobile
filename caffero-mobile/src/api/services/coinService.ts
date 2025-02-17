import { ApiException } from 'exceptions';
import { API_BASE_URL, API_ENDPOINTS } from '../config';
import { ApiResponse } from '../models/ApiResponse';
import { UserCoin, UpdateUserCoinRequest } from '../models/UserCoin';
import { useLanguage } from '../../contexts/LanguageContext';

export const useCoinService = () => {
    const { currentLanguage } = useLanguage();

    const getHeaders = (token?: string): HeadersInit => ({
        'Content-Type': 'application/json',
        'X-Language': currentLanguage?.id || 'tr',
        ...(token && { 'Authorization': `Bearer ${token}` })
    });

    return {
        async getCurrentUserCoins(token: string): Promise<UserCoin> {
            const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.COIN.GET_CURRENT_USER}`, {
                method: 'GET',
                headers: getHeaders(token)
            });

            const result: ApiResponse<UserCoin> = await response.json();

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Failed to get user coins',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }

            return result.result.data;
        },

        async increaseUserCoins(request: UpdateUserCoinRequest, token: string): Promise<UserCoin> {
            const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.COIN.INCREASE}`, {
                method: 'PATCH',
                headers: getHeaders(token),
                body: JSON.stringify(request)
            });

            const result: ApiResponse<UserCoin> = await response.json();

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Failed to increase user coins',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }

            return result.result.data;
        },

        async decreaseUserCoins(request: UpdateUserCoinRequest, token: string): Promise<UserCoin> {
            const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.COIN.DECREASE}`, {
                method: 'PATCH',
                headers: getHeaders(token),
                body: JSON.stringify(request)
            });

            const result: ApiResponse<UserCoin> = await response.json();

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Failed to decrease user coins',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }

            return result.result.data;
        }
    };
}; 
