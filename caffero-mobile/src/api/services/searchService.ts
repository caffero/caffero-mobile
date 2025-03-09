import { SearchItem } from '../models/SearchItem';
import { API_ENDPOINTS } from '../config';
import { useLanguage } from '../../contexts/LanguageContext';
import { ApiResponse } from '../models/ApiResponse';
import { ApiException } from 'exceptions';
import { cafferoBackendBuilder } from '../utils/CafferoBackendBuilder';
import { useAuth } from 'contexts/AuthContext';

// Mock data for search results
const mockSearchResults: SearchItem[] = [
  { id: '1', name: 'V60 Pour Over', type: 'Recipe' },
  { id: '2', name: 'Aeropress Recipe', type: 'Recipe' },
  { id: '3', name: 'Ethiopian Yirgacheffe', type: 'CoffeeBean' },
  { id: '4', name: 'Colombian Supremo', type: 'CoffeeBean' },
  { id: '5', name: 'Artisan Coffee Roasters', type: 'Roastery' },
  { id: '6', name: 'Coffee Masters', type: 'Roastery' },
  { id: '7', name: 'The Art of Coffee Roasting', type: 'Post' },
  { id: '8', name: 'Understanding Coffee Origins', type: 'Post' },
];

export const searchItems = async (query: string): Promise<SearchItem[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Filter items based on query
  return mockSearchResults.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase())
  );
};

export const useSearchService = () => {
    const { currentLanguage } = useLanguage();
    const { token } = useAuth();
    const apiClient = cafferoBackendBuilder()
        .withDefaultHeader('X-Language', currentLanguage?.id || 'tr')
        .withDefaultHeader('Authorization', `Bearer ${token}`)
        .build();

    return {
        async search(query: string): Promise<SearchItem[]> {
            try {
                const url = `${API_ENDPOINTS.HOME.SEARCH}?searchText=${encodeURIComponent(query)}`;
                const response = await apiClient
                    .get<ApiResponse<SearchItem[]>>(url)
                    .execute();

                return response.result!.data;
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to search items', 500, 'Unknown error');
            }
        }
    };
}; 