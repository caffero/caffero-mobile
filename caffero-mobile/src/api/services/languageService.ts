import { Language } from '../models/Language';
import { Localization } from '../models/Localization';
import { API_ENDPOINTS } from '../config';
import { ApiResponse } from '../models/ApiResponse';
import { ApiException } from 'exceptions';
import { mockLanguages, mockLocalizations } from './mockLanguageData';

// Implementation with API endpoints - commented out for now
/*
export const useLanguageService = () => {
    const getHeaders = (): HeadersInit => ({
        'Content-Type': 'application/json'
    });

    return {
        async getLanguages(): Promise<Language[]> {
            const response = await fetch(API_ENDPOINTS.LANGUAGE.GET_ALL, {
                method: 'GET',
                headers: getHeaders()
            });

            const result: ApiResponse<Language[]> = await response.json();

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Failed to fetch languages',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }

            return result.result.data;
        },

        async getLocalizations(languageId: string): Promise<Localization[]> {
            const response = await fetch(API_ENDPOINTS.LANGUAGE.GET_LOCALIZATIONS.replace(':id', languageId), {
                method: 'GET',
                headers: getHeaders()
            });

            const result: ApiResponse<Localization[]> = await response.json();

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Failed to fetch localizations',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }

            return result.result.data;
        }
    };
};
*/

// Mock implementation - currently in use
export const languageService = {
    getLanguages: async (): Promise<Language[]> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockLanguages;
    },

    getLocalizations: async (languageId: string): Promise<Localization[]> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockLocalizations[languageId] || [];
    }
}; 