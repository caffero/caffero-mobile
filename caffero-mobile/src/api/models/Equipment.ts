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
    equipmentId: string;
    imageUrl: string;
}

export interface UpdateEquipment {
    id: string;
    title?: string;
    typeId?: string;
    kindId?: string;
    imageUrl?: string;
    description?: string;
    specifications?: Record<string, string>;
}

export interface DeleteEquipment {
    id: string;
} 

export interface GetEquipmentType {
    id: string;
    text: string;
    imageUrl: string;
    equipmentTypeName: string;
}