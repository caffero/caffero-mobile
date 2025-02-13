import { SearchItem } from '../models/SearchItem';
import { API_ENDPOINTS } from '../config';
import { useLanguage } from '../../contexts/LanguageContext';
import { ApiResponse } from '../models/ApiResponse';
import { ApiException } from 'exceptions';

// Mock data for search results
const mockSearchResults: SearchItem[] = [
  { id: '1', title: 'V60 Pour Over', type: 'Recipe' },
  { id: '2', title: 'Aeropress Recipe', type: 'Recipe' },
  { id: '3', title: 'Ethiopian Yirgacheffe', type: 'CoffeeBean' },
  { id: '4', title: 'Colombian Supremo', type: 'CoffeeBean' },
  { id: '5', title: 'Artisan Coffee Roasters', type: 'Roastery' },
  { id: '6', title: 'Coffee Masters', type: 'Roastery' },
  { id: '7', title: 'The Art of Coffee Roasting', type: 'Post' },
  { id: '8', title: 'Understanding Coffee Origins', type: 'Post' },
];

export const searchItems = async (query: string): Promise<SearchItem[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Filter items based on query
  return mockSearchResults.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase())
  );
};

export const useSearchService = () => {
    const { currentLanguage } = useLanguage();

    const getHeaders = (): HeadersInit => ({
        'Content-Type': 'application/json',
        'X-Language': currentLanguage?.id || 'tr'
    });

    return {
        async search(query: string): Promise<SearchItem[]> {
            const response = await fetch(`${API_ENDPOINTS.SEARCH.SEARCH}?query=${encodeURIComponent(query)}`, {
                method: 'GET',
                headers: getHeaders()
            });

            const result: ApiResponse<SearchItem[]> = await response.json();

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Failed to search items',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }

            return result.result.data;
        }
    };
}; 