export type SearchItemType = 'CoffeeBean' | 'Recipe' | 'Roastery' | 'Post';

export interface SearchItem {
  id: string;
  name: string;
  imageUrl?: string | null;
  type: SearchItemType;
} 