import { ApiException } from 'exceptions';
import { API_ENDPOINTS } from '../config';
import { Login, Register, Account, UserToken, UserTokenView } from '../models/Account';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { GetUser } from '../models/User';

export const useAuthService = () => {
    const { currentLanguage } = useLanguage();
    const auth = useAuth();

    const getHeaders = (): HeadersInit => ({
        'Content-Type': 'application/json',
        'X-Language': currentLanguage?.id || 'tr'
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
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : '',
                    'X-Language': currentLanguage?.id || 'tr'
                }
            });
            
            if (!response.ok) throw new ApiException('Refresh token failed', response.status, response.statusText);
            
            return response.json();
        }
    }
}

