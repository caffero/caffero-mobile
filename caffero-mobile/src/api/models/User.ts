export interface GetUser {
    id: string;
    username: string;
    email: string;
    isPremium: boolean;
    imageUrl?: string;
}

export interface UpdateUser {
    id: string;
    username?: string;
    email?: string;
    imageUrl?: string;
}

export interface DeleteUser {
    id: string;
} 