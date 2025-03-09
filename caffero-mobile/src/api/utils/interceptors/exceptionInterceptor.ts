import { ResponseInterceptor } from '@barisvarlik/api-client/src/';
import { ApiException } from 'exceptions';

export class ExceptionInterceptor implements ResponseInterceptor {
    intercept(response: Response): Promise<Response> {

        if (response.status < 400) {
            return Promise.resolve(response);
        }

        const clonedResponse = response.clone();
        const json =clonedResponse.json().then(data => {
            if (data && 'isSuccess' in data && 'errorResult' in data) {
                console.log('ExceptionInterceptor: ApiResponse error:', data.errorResult);
                console.log('ExceptionInterceptor: ApiResponse error:', data.errorResult.data);
                
            }
        }).catch(() => {
            // Silently fail if response is not JSON or ApiResponse
        });
        
        switch (response.status) {
            case 401:
                // Redirect to login page
                console.log('ExceptionInterceptor: Unauthorized');
                break;
            case 403:
                console.log('ExceptionInterceptor: Forbidden'); 
                break;
            case 404:
                console.log('ExceptionInterceptor: Not Found');
                break;
            case 500:
                console.log('ExceptionInterceptor: Internal Server Error');
                break;
            default:
                console.log('ExceptionInterceptor: Unhandled status code:', response.status);
                console.log('ExceptionInterceptor: Response body:', json);
                break;
        }

        return Promise.resolve(response);
    }
}
