export interface CoffeeDetailViewModel {
    acidityValue?: number;
    bodyValue?: number;
    altitude: number;
}

export interface CoffeeAllViewModel {
    id: string;  // Guid in C# -> string in TS
    name: string;
    roasteryId: string;  // Guid in C# -> string in TS
    roasteryName: string;
    imageUrl?: string;
    countryId: number;
    countryName: string;
    county: string;
    operationId: number;
    operationName: string;
}

export interface CoffeeViewModel extends CoffeeAllViewModel {
    coffeeDetails?: CoffeeDetailViewModel;
    tasteNotes: string[];
}

export interface CreateCoffee {
    name: string;
    roasteryId: string;  // Guid in C# -> string in TS
    acidityId: number;
    bodyId: number;
    altitude: number;
    imageUrl?: string;
    countryId: number;
    county: string;
    operationId: number;
    tasteNoteList: number[];
}

export interface UpdateCoffee {
    id: string;  // Added to match the API endpoint requirements
    name?: string;
    roasteryId?: string;  // Guid in C# -> string in TS
    acidityId?: number;
    bodyId?: number;
    altitude?: number;
    imageUrl?: string;
    countryId?: number;
    county?: string;
    operationId?: number;
}

export interface DeleteCoffee {
    id: string;  // Guid in C# -> string in TS
}

// Type aliases for the API responses
export type GetCoffeeList = CoffeeAllViewModel;
export type GetCoffee = CoffeeViewModel; 