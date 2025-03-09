import { RequestInterceptor, ResponseInterceptor } from '@barisvarlik/api-client/src/';

export class LoggingInterceptor implements RequestInterceptor {
    intercept(request: Request, url: string): Request {

        if (request.method === 'GET' && url.includes('?') && url.endsWith('/')) {
            const newRequest = new Request(url.slice(0, -1), request);
            request = newRequest;
        }

        console.log(`${request.method} ${request.url}`);
        //console.log(request);
        return request;
    }
} 

export class LoggingResponseInterceptor implements ResponseInterceptor {
    intercept(response: Response): Promise<Response> {
        console.log(`Response from ${response.url} - Status: ${response.status}`);
        const clonedResponse = response.clone();
        clonedResponse.json().then(data => {
            if (data && 'isSuccess' in data && 'result' in data) {
                if (data.result.pagination) {
                    console.log('ApiResponse data count:', data.result.pagination);
                }
            }
        }).catch(() => {
            // Silently fail if response is not JSON or ApiResponse
        });
        return Promise.resolve(response);
    }
}