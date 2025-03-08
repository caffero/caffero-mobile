import { RequestInterceptor, ResponseInterceptor } from '@barisvarlik/api-client/src/';

// export class LoggingInterceptor implements RequestInterceptor {
//     intercept(request: RequestInit, url: string): RequestInit {
//         console.log('Request Signature:', request.method, url);
//         console.log('Request Headers:', request.headers);
//         console.log('Request Body:', request.body);
//         return request;
//     }
// }

// export class LoggingResponseInterceptor implements ResponseInterceptor {
//     intercept(response: Response): Promise<Response> {
//         console.log('Response status:', response.status, response.statusText);
//         return Promise.resolve(response);
//     }
// }


export class LoggingInterceptor implements RequestInterceptor {
    intercept(request: RequestInit, url: string): RequestInit {
        console.log(`Sending request (Logged by interceptor): ${request.method} ${url}`);
        return request;
    }
}

export class LoggingResponseInterceptor implements ResponseInterceptor {
    intercept(response: Response): Promise<Response> {
        console.log(`Received response (Logged by interceptor): ${response.status} ${response.statusText}`);
        return Promise.resolve(response);
    }
}
