import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserTokenView } from '../api/models/Account';
import { useAuthService } from '../api/services/authService';

interface AuthContextType {
    user: UserTokenView | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, fullName: string, phoneNumber: string, genderId: number) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserTokenView | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const authService = useAuthService();

    useEffect(() => {
        loadStoredAuth();
    }, []);

    const loadStoredAuth = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const storedToken = await AsyncStorage.getItem('token');
            if (storedToken) {
                // Refresh token to validate it and get fresh user data
                const refreshedData = await authService.refreshToken();
                setToken(refreshedData.token);
                // After refreshing token, we need to fetch user data
                // This would typically be handled by your user service
                // For now, we'll keep the token but clear user until we implement user fetch
                setUser(null);
            }
        } catch (error) {
            console.error('Failed to load stored auth:', error);
            setError('Failed to load stored auth');
            // Clear potentially invalid stored data
            await AsyncStorage.removeItem('token');
            setUser(null);
            setToken(null);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await authService.login({ email, password });
            setUser(response);
            setToken(response.authProperties.token);
            await AsyncStorage.setItem('token', response.authProperties.token);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Login failed';
            setError(message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (email: string, password: string, fullName: string, phoneNumber: string, genderId: number) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await authService.register({ email, password, fullName, phoneNumber, genderId });
            setUser(response);
            setToken(response.authProperties.token);
            await AsyncStorage.setItem('token', response.authProperties.token);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Registration failed';
            setError(message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            setIsLoading(true);
            setError(null);
            await authService.logout();
            setUser(null);
            setToken(null);
            await AsyncStorage.removeItem('token');
        } catch (error) {
            console.error('Logout failed:', error);
            setError('Logout failed');
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, isLoading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 