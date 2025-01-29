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

export interface CreateCoffeeBean {
    name: string;
    roastery: string;
    country: string;
    imageUrl: string;
    acidity: number;
    body: number;
    intensity: number;
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