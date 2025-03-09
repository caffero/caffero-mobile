import { RequestInterceptor, ResponseInterceptor } from "@barisvarlik/api-client";
import { AuthContextType } from "../../../contexts/AuthContext";

export class RefreshTokenInterceptor implements ResponseInterceptor {
    shouldRetry?: boolean | undefined;
    private auth: AuthContextType;

    constructor(auth: AuthContextType) {
        this.auth = auth;
    }

    async intercept(response: Response): Promise<Response> {
        if (response.status === 401) {
            console.log("Request failed with 401, refreshing token...");    
            await this.auth.refreshToken();
            this.shouldRetry = true;
            console.log("Request failed with 401, retrying...");
        }
        return Promise.resolve(response);
    }
}