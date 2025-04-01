import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Language } from '../api/models/Language';
import { Localization } from '../api/models/Localization';
import { languageService } from '../api/services/languageService';

interface LanguageContextType {
    currentLanguage: Language | null;
    localizations: Localization[];
    languages: Language[];
    setLanguage: (language: Language) => Promise<void>;
    getText: (propertyName: string) => string;
    loading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState<Language | null>(null);
    const [localizations, setLocalizations] = useState<Localization[]>([]);
    const [languages, setLanguages] = useState<Language[]>([]);
    const [loading, setLoading] = useState(true);

    const loadLanguages = useCallback(async () => {
        try {
            const availableLanguages = await languageService.getLanguages();
            setLanguages(availableLanguages);
            
            // Set default language if none selected
            if (!currentLanguage && availableLanguages.length > 0) {
                await setLanguage(availableLanguages[0]);
            }
        } catch (error) {
            console.error('Error loading languages:', error);
        }
    }, [currentLanguage]);

    const setLanguage = async (language: Language) => {
        try {
            setLoading(true);
            const localizationData = await languageService.getLocalizations(language.id);
            setCurrentLanguage(language);
            setLocalizations(localizationData);
        } catch (error) {
            console.error('Error setting language:', error);
        } finally {
            setLoading(false);
        }
    };

    const getText = (propertyName: string): string => {
        const localization = localizations.find(l => l.propertyName === propertyName);
        return localization?.value || propertyName;
    };

    useEffect(() => {
        loadLanguages();
    }, [loadLanguages]);

    return (
        <LanguageContext.Provider
            value={{
                currentLanguage,
                localizations,
                languages,
                setLanguage,
                getText,
                loading
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}; 