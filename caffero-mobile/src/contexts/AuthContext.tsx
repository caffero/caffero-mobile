import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserTokenView } from '../api/models/Account';
import { useAuthService } from '../api/services/authService';
import { AuthResponse, LoginCredentials, RegisterCredentials, User } from '../types/auth';
import { authApi } from '../api/auth';

// Storage keys
const USER_STORAGE_KEY = '@user';
const TOKEN_STORAGE_KEY = '@token';

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isRegistered: boolean;
    passwordForgotten: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, username: string) => Promise<void>;
    verifyOtp: (otp: string) => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    resetForgottenPassword: (newPassword: string) => Promise<void>;
    resetPassword: (currentPassword: string, newPassword: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRegistered, setIsRegistered] = useState(false);
    const [passwordForgotten, setPasswordForgotten] = useState(false);

    // Load stored auth data when app starts
    useEffect(() => {
        loadStoredAuth();
    }, []);

    const loadStoredAuth = async () => {
        try {
            const [storedUser, storedToken] = await Promise.all([
                AsyncStorage.getItem(USER_STORAGE_KEY),
                AsyncStorage.getItem(TOKEN_STORAGE_KEY),
            ]);

            if (storedUser && storedToken) {
                setUser(JSON.parse(storedUser));
                setToken(storedToken);
            }
        } catch (error) {
            console.error('Failed to load stored auth data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const storeAuthData = async (user: User, token: string) => {
        try {
            await Promise.all([
                AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user)),
                AsyncStorage.setItem(TOKEN_STORAGE_KEY, token),
            ]);
        } catch (error) {
            console.error('Failed to store auth data:', error);
        }
    };

    const clearAuthData = async () => {
        try {
            await Promise.all([
                AsyncStorage.removeItem(USER_STORAGE_KEY),
                AsyncStorage.removeItem(TOKEN_STORAGE_KEY),
            ]);
        } catch (error) {
            console.error('Failed to clear auth data:', error);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await authApi.login({ email, password });
            setUser(response.user);
            setToken(response.token);
            await storeAuthData(response.user, response.token);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const register = async (email: string, password: string, username: string) => {
        try {
            const response = await authApi.register({ email, password, username });
            setIsRegistered(true);
            // Don't set user and token yet - wait for OTP verification
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    const verifyOtp = async (otp: string) => {
        try {
            const response = await authApi.verifyOtp(otp);
            if (isRegistered) {
                // User just registered, set their data
                setUser(response.user);
                setToken(response.token);
                await storeAuthData(response.user, response.token);
                setIsRegistered(false);
            }
            // If passwordForgotten is true, don't set user data - they need to reset password first
        } catch (error) {
            console.error('OTP verification failed:', error);
            throw error;
        }
    };

    const forgotPassword = async (email: string) => {
        try {
            await authApi.forgotPassword(email);
            setPasswordForgotten(true);
        } catch (error) {
            console.error('Forgot password request failed:', error);
            throw error;
        }
    };

    const resetForgottenPassword = async (newPassword: string) => {
        try {
            await authApi.resetForgottenPassword(newPassword);
            setPasswordForgotten(false);
        } catch (error) {
            console.error('Reset forgotten password failed:', error);
            throw error;
        }
    };

    const resetPassword = async (currentPassword: string, newPassword: string) => {
        if (!token) {
            throw new Error('No authentication token found');
        }
        try {
            await authApi.resetPassword(currentPassword, newPassword, token);
        } catch (error) {
            console.error('Reset password failed:', error);
            throw error;
        }
    };

    const logout = async () => {
        setUser(null);
        setToken(null);
        setIsRegistered(false);
        setPasswordForgotten(false);
        await clearAuthData();
    };

    if (isLoading) {
        // You might want to return a loading screen here
        return null;
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!user && !!token,
                isRegistered,
                passwordForgotten,
                login,
                register,
                verifyOtp,
                forgotPassword,
                resetForgottenPassword,
                resetPassword,
                logout,
            }}
        >
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