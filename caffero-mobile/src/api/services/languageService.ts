import { Language } from '../models/Language';
import { Localization } from '../models/Localization';
import { API_BASE_URL, API_ENDPOINTS } from '../config';
import { ApiResponse } from '../models/ApiResponse';
import { ApiException } from 'exceptions';
import { mockLanguages, mockLocalizations } from './mockLanguageData';
import { cafferoBackendBuilder } from '../utils/CafferoBackendBuilder';
import { LoggingResponseInterceptor } from 'api/utils/interceptors/loggingInterceptor';
import { LoggingInterceptor } from 'api/utils/interceptors/loggingInterceptor';

export const useLanguageService = () => {
    const client = cafferoBackendBuilder().build();

    return {
        async getLanguages(): Promise<Language[]> {
            const request = client
            .get<ApiResponse<Language[]>>(API_ENDPOINTS.LANGUAGE.GET_ALL);
            
            const response = await request.execute();
            return response.result?.data || [];
        },

        async getLocalizations(languageId: string): Promise<Localization[]> {
            const response = await client.get<ApiResponse<Localization[]>>(API_ENDPOINTS.LANGUAGE.GET_LOCALIZATIONS.replace(':id', languageId)).execute();
            return response.result?.data || [];
        }
    };
};


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