export interface GetRecipeList {
    id: string;
    title: string;
    coffeeBean: string;
    equipment: string;
    grindSize: string;
    waterTemperature: number;
    brewTime: number;
    coffeeAmount: number;
    waterAmount: number;
    imageUrl?: string;
}

export interface GetRecipe extends GetRecipeList {
    description?: string;
    steps: string[];
    notes?: string;
}

export interface CreateRecipe {
    title: string;
    coffeeBeanId: string;
    equipmentId: string;
    grindSize: string;
    waterTemperature: number;
    brewTime: number;
    coffeeAmount: number;
    waterAmount: number;
    imageUrl?: string;
    description?: string;
    steps: string[];
    notes?: string;
}

export interface UpdateRecipe {
    id: string;
    title?: string;
    coffeeBeanId?: string;
    equipmentId?: string;
    grindSize?: string;
    waterTemperature?: number;
    brewTime?: number;
    coffeeAmount?: number;
    waterAmount?: number;
    imageUrl?: string;
    description?: string;
    steps?: string[];
    notes?: string;
}

export interface DeleteRecipe {
    id: string;
} 