import { createApiClient } from '@barisvarlik/api-client/src/ApiClientBuilder';
import { API_BASE_URL } from '../config';
import { LoggingInterceptor, LoggingResponseInterceptor } from './interceptors/loggingInterceptor';
export const cafferoBackendBuilder = () => {
    return createApiClient()
        .withBaseUrl(API_BASE_URL)
        .withRequestInterceptor(new LoggingInterceptor())
        .withResponseInterceptor(new LoggingResponseInterceptor());
};

