export interface ApiErrorData {
    traceId: string;
    code: string;
    message: string;
    detail: string;
    multiErrorCodeData?: any;
}

export interface ApiErrorResult {
    status: number;
    data: ApiErrorData;
}

export interface ApiResponse<T> {
    isSuccess: boolean;
    result: {
        status: number;
        data: T;
    } | null;
    errorResult: ApiErrorResult | null;
} 