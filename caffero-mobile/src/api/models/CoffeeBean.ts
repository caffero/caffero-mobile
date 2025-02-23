export interface GetCoffeeBeanList {
    id: string;
    name: string;
    roastery: string;
    country: string;
    imageUrl: string;
    acidity: number;
    body: number;
    intensity: number;
}

export interface GetCoffeeBean extends GetCoffeeBeanList {
    // Additional fields for detail view if needed
}

// Add coffee bean to user's shelf
export interface CreateCoffeeBean {
    id: string;
    hasTasted: boolean;
}

export interface UpdateCoffeeBean {
    id: string;
    name?: string;
    roastery?: string;
    country?: string;
    imageUrl?: string;
    acidity?: number;
    body?: number;
    intensity?: number;
}

export interface DeleteCoffeeBean {
    id: string;
} 