import { Language } from '../models/Language';
import { Localization } from '../models/Localization';
import { API_BASE_URL, API_ENDPOINTS } from '../config';
import { ApiResponse } from '../models/ApiResponse';
import { ApiException } from 'exceptions';
import { mockLanguages, mockLocalizations } from './mockLanguageData';
import { cafferoBackendBuilder } from '../utils/CafferoBackendBuilder';

export const useLanguageService = () => {
    const apiClient = cafferoBackendBuilder().build();

    return {
        async getLanguages(): Promise<Language[]> {
            try {
                const response = await apiClient
                    .get<ApiResponse<Language[]>>(API_ENDPOINTS.LANGUAGE.GET_ALL)
                    .execute();
                return response.result?.data || [];
            } catch (error: any) {
                if (error.response) {
                    console.error('Error response:', {
                        status: error.response.status,
                        headers: error.response.headers,
                        data: error.response.data
                    });
                }
                console.error('Error fetching languages:', error);
                return [];
            }
        },
        async getLocalizations(languageId: string): Promise<Localization[]> {
            try {
                const endpoint = API_ENDPOINTS.LANGUAGE.GET_LOCALIZATIONS.replace(':id', languageId);
                const response = await apiClient
                    .get<ApiResponse<Localization[]>>(endpoint)
                    .execute();
                return response.result?.data || [];
            } catch (error) {
                console.error(`Error fetching localizations for language ${languageId}:`, error);
                return [];
            }
        }
    }
}

export default class LanguageService {
    private apiClient;

    constructor() {
        this.apiClient = cafferoBackendBuilder().build();
    }

    public async getLanguages(): Promise<Language[]> {
        try {
            const response = await this.apiClient
                .get<ApiResponse<Language[]>>(API_ENDPOINTS.LANGUAGE.GET_ALL)
                .execute();
            return response.result?.data || [];
        } catch (error: any) {
            if (error.response) {
                console.error('Error response:', {
                    status: error.response.status,
                    headers: error.response.headers,
                    data: error.response.data
                });
            }
            console.error('Error fetching languages:', error);
            return [];
        }
    }

    public async getLocalizations(languageId: string): Promise<Localization[]> {
        try {
            const endpoint = API_ENDPOINTS.LANGUAGE.GET_LOCALIZATIONS.replace(':id', languageId);
            const response = await this.apiClient
                .get<ApiResponse<Localization[]>>(endpoint)
                .execute();
            return response.result?.data || [];
        } catch (error) {
            console.error(`Error fetching localizations for language ${languageId}:`, error);
            return [];
        }
    }
}


// Create a singleton instance

// Mock implementation - currently in use
// export const languageService = {
//     getLanguages: async (): Promise<Language[]> => {
//         // Simulate API delay
//         await new Promise(resolve => setTimeout(resolve, 300));
//         return mockLanguages;
//     },

//     getLocalizations: async (languageId: string): Promise<Localization[]> => {
//         // Simulate API delay
//         await new Promise(resolve => setTimeout(resolve, 300));
//         return mockLocalizations[languageId] || [];
//     }
// };

// Export the Axios implementation for when you're ready to switch