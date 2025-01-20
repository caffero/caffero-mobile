import { Language } from '../models/Language';
import { Localization } from '../models/Localization';
import { mockLanguages, mockLocalizations } from './mockLanguageData';

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