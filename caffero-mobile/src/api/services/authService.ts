import { ApiException } from 'exceptions';
import { API_ENDPOINTS } from '../config';
import { Login, Register, Account, UserToken, UserTokenView } from '../models/Account';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { GetUser } from '../models/User';

export const useAuthService = () => {
    const { currentLanguage } = useLanguage();
    const auth = useAuth();

    const getHeaders = (token?: string): HeadersInit => ({
        'Content-Type': 'application/json',
        'X-Language': currentLanguage?.id || 'tr',
        ...(token && { 'Authorization': `Bearer ${token}` })
    });

    return {
        async login(credentials: Login): Promise<UserTokenView> {
            const response = await fetch(API_ENDPOINTS.ACCOUNT.LOGIN, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(credentials)
            });
            
            if (!response.ok) throw new ApiException('Login failed', response.status, response.statusText);
            
            return response.json();
        },

        async register(credentials: Register): Promise<UserTokenView> {
            const response = await fetch(API_ENDPOINTS.ACCOUNT.REGISTER, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(credentials)
            });
            
            if (!response.ok) throw new ApiException('Registration failed', response.status, response.statusText);
            
            return response.json();
        },

        async logout(): Promise<void> {
            const response = await fetch(API_ENDPOINTS.ACCOUNT.LOGOUT, {
                method: 'POST',
                headers: getHeaders()
            });
            
            if (!response.ok) throw new ApiException('Logout failed', response.status, response.statusText);
        },

        async refreshToken(): Promise<UserToken> {
            const { token } = auth;

            const response = await fetch(API_ENDPOINTS.ACCOUNT.REFRESH_TOKEN, {
                method: 'POST',
                headers: getHeaders(token || undefined)
            });
            
            if (!response.ok) throw new ApiException('Refresh token failed', response.status, response.statusText);
            
            return response.json();
        },

        async getProfile(token: string): Promise<GetUser> {
            const response = await fetch(API_ENDPOINTS.ACCOUNT.PROFILE, {
                method: 'GET',
                headers: getHeaders(token)
            });
            
            if (!response.ok) throw new ApiException('Failed to fetch profile', response.status, response.statusText);
            
            return response.json();
        },

        async verifyOtp(otp: string): Promise<UserTokenView> {
            const response = await fetch(API_ENDPOINTS.ACCOUNT.VERIFY_OTP, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ otp })
            });
            
            if (!response.ok) throw new ApiException('OTP verification failed', response.status, response.statusText);
            
            return response.json();
        },

        async forgotPassword(email: string): Promise<void> {
            const response = await fetch(API_ENDPOINTS.ACCOUNT.FORGOT_PASSWORD, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ email })
            });
            
            if (!response.ok) throw new ApiException('Failed to process forgot password request', response.status, response.statusText);
        },

        async resetForgottenPassword(newPassword: string): Promise<void> {
            const response = await fetch(API_ENDPOINTS.ACCOUNT.RESET_FORGOTTEN_PASSWORD, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ newPassword })
            });
            
            if (!response.ok) throw new ApiException('Failed to reset password', response.status, response.statusText);
        },

        async resetPassword(currentPassword: string, newPassword: string, token: string): Promise<void> {
            const response = await fetch(API_ENDPOINTS.ACCOUNT.RESET_PASSWORD, {
                method: 'POST',
                headers: getHeaders(token),
                body: JSON.stringify({ currentPassword, newPassword })
            });
            
            if (!response.ok) throw new ApiException('Failed to change password', response.status, response.statusText);
        }
    }
}

