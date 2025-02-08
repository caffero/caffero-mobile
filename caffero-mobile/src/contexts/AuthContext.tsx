import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/auth';
import { authApi } from '../api/auth';

interface AuthContextType {
    user: User | null;
    token: string | null;
    isPremium: boolean;
    isRegistered: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, username: string) => Promise<void>;
    verifyOtp: (otp: string) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isPremium, setIsPremium] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadStoredAuth();
    }, []);

    const loadStoredAuth = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const storedToken = await AsyncStorage.getItem('token');
            if (storedToken) {
                const userData = await authApi.getProfile(storedToken);
                setUser(userData);
                setToken(storedToken);
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
            const response = await authApi.login({ email, password });
            setUser(response.user);
            setToken(response.token);
            await AsyncStorage.setItem('token', response.token);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Login failed';
            setError(message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (email: string, password: string, username: string) => {
        try {
            setIsLoading(true);
            setError(null);
            await authApi.register({ email, password, username });
            setIsRegistered(true);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Registration failed';
            setError(message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const verifyOtp = async (otp: string) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await authApi.verifyOtp(otp);
            setUser(response.user);
            setToken(response.token);
            await AsyncStorage.setItem('token', response.token);
            setIsRegistered(false); // Reset registration state
        } catch (error) {
            const message = error instanceof Error ? error.message : 'OTP verification failed';
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
            setUser(null);
            setToken(null);
            setIsRegistered(false);
            await AsyncStorage.removeItem('token');
        } catch (error) {
            console.error('Logout failed:', error);
            setError('Logout failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            token, 
            isPremium, 
            isRegistered,
            login, 
            register, 
            verifyOtp,
            logout, 
            isLoading, 
            error 
        }}>
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