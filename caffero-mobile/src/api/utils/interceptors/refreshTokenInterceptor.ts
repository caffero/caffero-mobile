import { RequestInterceptor, ResponseInterceptor } from "@barisvarlik/api-client";
import { AuthContextType } from "../../../contexts/AuthContext";
import { ApiException } from "exceptions";

export class RefreshTokenInterceptor implements ResponseInterceptor {
    shouldRetry?: boolean | undefined;
    private auth: AuthContextType;

    constructor(auth: AuthContextType) {
        this.auth = auth;
    }

    async intercept(response: Response): Promise<Response> {

        if (response.status != 401) {
            return Promise.resolve(response);
        }

        const clonedResponse = response.clone();
        const isSessionExpired = await clonedResponse.json().then(res => {
            if (res && 'isSuccess' in res
                && 'errorResult' in res
                && 'data' in res.errorResult
                && 'code' in res.errorResult.data
                && res.errorResult.data.code == 'Business.SessionExpired.Error') {

                return true;
            }
            return false;
        });

        if (isSessionExpired) {
            await this.auth.logout();
            return Promise.reject(new ApiException('Session expired', 401, 'Session expired. User must login again.'));
        }

        console.log("Request failed with 401, refreshing token...");
        await this.auth.refreshToken();
        this.shouldRetry = true;
        console.log("Request failed with 401, retrying...");

        return Promise.resolve(response);
    }
}