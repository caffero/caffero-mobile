export interface Login {
    email: string;
    password: string;
}

export interface Register {
    email: string;
    password: string;
    fullName: string;
    phoneNumber: string;
    genderId: number;
}

export interface Account {
    userId: string;
    fullName: string;
    photoUrl: string;
}

export interface UserToken {
    token: string;
    refreshToken: string;
    expires: Date;
    refreshTokenExpires: Date;
    clientId: string;
}

export interface UserTokenView {
    userId: string;
    email: string;
    fullName: string;
    roles: string[];
    authProperties: UserToken;
    isPremium: boolean;
}