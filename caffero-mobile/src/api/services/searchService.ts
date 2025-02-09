import { SearchItem } from '../models/SearchItem';

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