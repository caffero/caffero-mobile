import { ApiException, CafferoException } from 'exceptions';
import { API_ENDPOINTS } from '../config';
import { Login, Register, Account, UserToken, UserTokenView, VerifyOtpAndLogin, Logout } from '../models/Account';
import { useLanguage } from '../../contexts/LanguageContext';
import { GetUser } from '../models/User';
import { ApiResponse } from '../models/ApiResponse';
import { cafferoBackendBuilder } from '../utils/CafferoBackendBuilder';

export const useAuthService = () => {
    const { currentLanguage } = useLanguage();
    const apiClient = cafferoBackendBuilder()
    .withDefaultHeader('X-Language', currentLanguage?.id || 'tr')
    .build();

    return {
        async login(credentials: Login): Promise<UserTokenView> {
            try {
                credentials = {"email":"premiumuser@caffero.co","password":"Caffero123!"}  
                const response = await apiClient
                    .post<ApiResponse<UserTokenView>>(API_ENDPOINTS.ACCOUNT.LOGIN, credentials)
                    .withHeader('Content-Type', 'application/json')
                    .execute();

                return response.result!.data;
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Login failed', 500, 'Unknown error');
            }
        },

        async register(credentials: Register): Promise<UserTokenView> {
            // Password validation regex
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[./!@#$%^&*])[A-Za-z\d./!@#$%^&*]{8,}$/;

            // Validate password
            if (!passwordRegex.test(credentials.password)) {
                throw new CafferoException('Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (./!@#$%^&*)');
            }

            try {
                const response = await apiClient
                    .post<ApiResponse<UserTokenView>>(API_ENDPOINTS.ACCOUNT.REGISTER, credentials)
                    .execute();

                return response.result!.data;
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Registration failed', 500, 'Unknown error');
            }
        },

        async logout(model: Logout): Promise<void> {
            try {
                const response = await apiClient
                    .post<ApiResponse<void>>(API_ENDPOINTS.ACCOUNT.LOGOUT, model)
                    //.withHeader('Authorization', `Bearer ${token}}`)
                    .execute();
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Logout failed', 500, 'Unknown error');
            }
        },

        async refreshToken(email: string | undefined, clientId: string | undefined): Promise<UserTokenView> {
            try {
                if (!email || !clientId) {
                    throw new ApiException('Email and clientId are required', 400, 'Invalid request');
                }

                const response = await apiClient
                    .post<ApiResponse<UserTokenView>>(API_ENDPOINTS.ACCOUNT.REFRESH_TOKEN, { email, clientId })
                    .withHeader('Content-Type', 'application/json')
                    .execute();

                return response.result!.data;
            } catch (error) {
                console.log("Error refreshing token:", error);
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Refresh token failed', 500, 'Unknown error');
            }
        },

        async getProfile(token: string): Promise<GetUser> {
            try {
                const response = await apiClient
                    .get<ApiResponse<GetUser>>(API_ENDPOINTS.ACCOUNT.PROFILE)
                    .withHeader('X-Language', currentLanguage?.id || 'tr')
                    .withHeader('Authorization', `Bearer ${token}`)
                    .execute();

                return response.result!.data;
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to fetch profile', 500, 'Unknown error');
            }
        },

        async verifyOtpAndLogin(model: VerifyOtpAndLogin): Promise<UserTokenView> {
            try {
                const response = await apiClient
                    .post<ApiResponse<UserTokenView>>(API_ENDPOINTS.ACCOUNT.VERIFY_OTP_AND_LOGIN, model)
                    .execute();

                return response.result!.data;
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('OTP verification failed', 500, 'Unknown error');
            }
        },

        async verifyOtp(otp: string): Promise<UserTokenView> {
            try {
                const response = await apiClient
                    .post<ApiResponse<UserTokenView>>(API_ENDPOINTS.ACCOUNT.VERIFY_OTP, { otp })
                    .execute();

                return response.result!.data;
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('OTP verification failed', 500, 'Unknown error');
            }
        },

        async forgotPassword(email: string): Promise<void> {
            try {
                const response = await apiClient
                    .post<ApiResponse<void>>(API_ENDPOINTS.ACCOUNT.FORGOT_PASSWORD, { email })
                    .execute();

                return response.result!.data;
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to process forgot password request', 500, 'Unknown error');
            }
        },

        async resetForgottenPassword(newPassword: string): Promise<void> {
            try {
                const response = await apiClient
                    .post<ApiResponse<void>>(API_ENDPOINTS.ACCOUNT.RESET_FORGOTTEN_PASSWORD, { newPassword })
                    .execute();

                return response.result!.data;
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to reset password', 500, 'Unknown error');
            }
        },

        async resetPassword(currentPassword: string, newPassword: string, token: string): Promise<void> {
            try {
                const response = await apiClient
                    .post<ApiResponse<void>>(API_ENDPOINTS.ACCOUNT.RESET_PASSWORD, { currentPassword, newPassword })
                    .withHeader('Authorization', `Bearer ${token}`)
                    .execute();

                if (!response.isSuccess || !response.result) {
                    throw new ApiException(
                        response.errorResult?.data.message || 'Failed to change password',
                        response.errorResult?.status || 500,
                        response.errorResult?.data.detail || 'Unknown error'
                    );
                }
            } catch (error) {
                if (error instanceof ApiException) {
                    throw error;
                }
                throw new ApiException('Failed to change password', 500, 'Unknown error');
            }
        }
    }
}

