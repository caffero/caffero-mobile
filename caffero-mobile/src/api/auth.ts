import { AuthResponse, LoginCredentials, RegisterCredentials, User } from '../types/auth';
import { API_BASE_URL, API_ENDPOINTS } from './config';

export const authApi = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        // Actual API call (commented out for now)
        /*
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LOGIN}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        
        if (!response.ok) {
            throw new Error('Login failed');
        }
        
        return response.json();
        */

        // Dummy data
        return {
            user: {
                id: '1',
                email: credentials.email,
                username: 'DummyUser',
            },
            token: 'dummy-token-12345',
        };
    },

    register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
        // Actual API call (commented out for now)
        /*
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.REGISTER}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        
        if (!response.ok) {
            throw new Error('Registration failed');
        }
        
        return response.json();
        */

        // Dummy data
        return {
            user: {
                id: '1',
                email: credentials.email,
                username: credentials.username,
            },
            token: 'dummy-token-12345',
        };
    },

    getProfile: async (token: string): Promise<User> => {
        // Actual API call (commented out for now)
        /*
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PROFILE}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch profile');
        }
        
        return response.json();
        */

        // Dummy data
        return {
            id: '1',
            email: 'user@example.com',
            username: 'DummyUser',
        };
    },

    verifyOtp: async (otp: string): Promise<AuthResponse> => {
        // Actual API call (commented out for now)
        /*
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.VERIFY_OTP}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ otp }),
        });
        
        if (!response.ok) {
            throw new Error('OTP verification failed');
        }
        
        return response.json();
        */

        // Dummy data
        return {
            user: {
                id: '1',
                email: 'user@example.com',
                username: 'DummyUser',
            },
            token: 'dummy-token-12345',
        };
    },
}; 