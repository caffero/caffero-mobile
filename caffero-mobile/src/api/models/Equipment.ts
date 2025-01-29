export interface GetEquipmentList {
    id: string;
    title: string;
    type: string;
    kind: string;
    imageUrl: string;
}

export interface GetEquipment extends GetEquipmentList {
    description?: string;
    specifications?: Record<string, string>;
}

export interface CreateEquipment {
    title: string;
    type: string;
    kind: string;
    imageUrl: string;
    description?: string;
    specifications?: Record<string, string>;
}

export interface UpdateEquipment {
    id: string;
    title?: string;
    type?: string;
    kind?: string;
    imageUrl?: string;
    description?: string;
    specifications?: Record<string, string>;
}

export interface DeleteEquipment {
    id: string;
} 