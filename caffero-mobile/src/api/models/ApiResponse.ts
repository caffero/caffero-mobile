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
        pagination: Pagination;
    } | null;
    errorResult: ApiErrorResult | null;
} 

export interface Pagination {
    pageNumber: number;
    pageSize: number;
    totalPageCount: number;
}