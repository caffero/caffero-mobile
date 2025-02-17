export interface UserCoin {
    userId: string;
    coinAmount: number;
}

export interface UpdateUserCoinRequest {
    coinAmount: number;
} 