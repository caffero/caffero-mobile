export interface GetUser {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    isPremium: boolean;
    //imageUrl?: string;
}

export interface UpdateUser {
    id: string;
    fullName?: string;
    email?: string;
    phoneNumber?: string;
    isPremium?: boolean;
    //imageUrl?: string;
}

export interface DeleteUser {
    id: string;
} 