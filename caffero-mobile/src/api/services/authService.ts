import { ApiException, CafferoException } from 'exceptions';
import { API_ENDPOINTS, API_BASE_URL } from '../config';
import { Login, Register, Account, UserToken, UserTokenView, VerifyOtpAndLogin, Logout } from '../models/Account';
import { useLanguage } from '../../contexts/LanguageContext';
import { GetUser } from '../models/User';
import { ApiResponse } from '../models/ApiResponse';

export const useAuthService = () => {
    const { currentLanguage } = useLanguage();

    const getHeaders = (token?: string): HeadersInit => ({
        'Content-Type': 'application/json',
        'X-Language': currentLanguage?.id || 'tr',
        ...(token && { 'Authorization': `Bearer ${token}` })
    });

    return {
        async login(credentials: Login): Promise<UserTokenView> {
            const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ACCOUNT.LOGIN}`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(credentials)
            });

            const result: ApiResponse<UserTokenView> = await response.json();

            console.log(result.result);

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Login failed',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }

            return result.result.data;
        },

        async register(credentials: Register): Promise<UserTokenView> {
            // Password validation regex
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[./!@#$%^&*])[A-Za-z\d./!@#$%^&*]{8,}$/;

            // Validate password
            if (!passwordRegex.test(credentials.password)) {
                throw new CafferoException('Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (./!@#$%^&*)');
            }

            const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ACCOUNT.REGISTER}`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(credentials)
            });

            const result: ApiResponse<UserTokenView> = await response.json();

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Registration failed',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }

            return result.result.data;
        },

        async logout(model: Logout): Promise<void> {
            const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ACCOUNT.LOGOUT}`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(model)
            });

            const result: ApiResponse<void> = await response.json();

            console.log(result);

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Logout failed',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }
        },

        async refreshToken(token: string): Promise<UserToken> {
            const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ACCOUNT.REFRESH_TOKEN}`, {
                method: 'POST',
                headers: getHeaders(token)
            });

            const result: ApiResponse<UserToken> = await response.json();

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Refresh token failed',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }

            return result.result.data;
        },

        async getProfile(token: string): Promise<GetUser> {
            const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ACCOUNT.PROFILE}`, {
                method: 'GET',
                headers: getHeaders(token)
            });

            const result: ApiResponse<GetUser> = await response.json();

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Failed to fetch profile',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }

            return result.result.data;
        },

        async verifyOtpAndLogin(model: VerifyOtpAndLogin): Promise<UserTokenView> {
            const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ACCOUNT.VERIFY_OTP_AND_LOGIN}`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(model)
            });

            const result: ApiResponse<UserTokenView> = await response.json();

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'OTP verification failed',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }

            return result.result.data;
        },

        async verifyOtp(otp: string): Promise<UserTokenView> {
            const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ACCOUNT.VERIFY_OTP}`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ otp })
            });

            const result: ApiResponse<UserTokenView> = await response.json();

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'OTP verification failed',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }

            return result.result.data;
        },

        async forgotPassword(email: string): Promise<void> {
            const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ACCOUNT.FORGOT_PASSWORD}`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ email })
            });

            const result: ApiResponse<void> = await response.json();

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Failed to process forgot password request',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }
        },

        async resetForgottenPassword(newPassword: string): Promise<void> {
            const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ACCOUNT.RESET_FORGOTTEN_PASSWORD}`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ newPassword })
            });

            const result: ApiResponse<void> = await response.json();

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Failed to reset password',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }
        },

        async resetPassword(currentPassword: string, newPassword: string, token: string): Promise<void> {
            const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ACCOUNT.RESET_PASSWORD}`, {
                method: 'POST',
                headers: getHeaders(token),
                body: JSON.stringify({ currentPassword, newPassword })
            });

            const result: ApiResponse<void> = await response.json();

            if (!result.isSuccess || !result.result) {
                throw new ApiException(
                    result.errorResult?.data.message || 'Failed to change password',
                    result.errorResult?.status || response.status,
                    result.errorResult?.data.detail || response.statusText
                );
            }
        }
    }
}

