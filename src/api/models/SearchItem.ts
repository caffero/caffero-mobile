export type SearchItemType = 'CoffeeBean' | 'Recipe' | 'Roastery' | 'Post';

export interface SearchItem {
  id: string;
  title: string;
  type: SearchItemType;
} 