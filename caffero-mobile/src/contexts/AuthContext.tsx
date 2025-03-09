import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserTokenView, Register, Login, VerifyOtpAndLogin, UserToken } from '../api/models/Account';
import { useAuthService } from '../api/services/authService';

// Storage keys
const USER_STORAGE_KEY = '@user';
const TOKEN_STORAGE_KEY = '@token';

interface User {
    userId: string;
    email: string;
    fullName: string;
    roles: string[];
    isPremium?: boolean;
    authProperties: UserToken;
}

export interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isRegistered: boolean;
    passwordForgotten: boolean;
    isLoading: boolean;
    isPremium: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, username: string) => Promise<void>;
    verifyOtp: (otp: string) => Promise<void>;
    verifyOtpAndLogin: (otp: string) => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    resetForgottenPassword: (newPassword: string) => Promise<void>;
    resetPassword: (currentPassword: string, newPassword: string) => Promise<void>;
    refreshToken: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRegistered, setIsRegistered] = useState(false);
    const [passwordForgotten, setPasswordForgotten] = useState(false);
    const [loginInformation, setLoginInformation] = useState<Login | null>(null);
    const authService = useAuthService();

    useEffect(() => {
        const initialize = async () => {
            setIsLoading(true);
            try {
                await loadStoredAuth();
            } catch (error) {
                console.error('Failed to initialize auth:', error);
            } finally {
                setIsLoading(false);
            }
        };
        initialize();
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
            // Clear potentially corrupted data
            await clearAuthData();
            setUser(null);
            setToken(null);
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
            setIsLoading(true);
            const response = await authService.login({ email, password });
            const userData: User = {
                userId: response.userId,
                email: response.email,
                fullName: response.fullName,
                roles: response.roles,
                authProperties: response.authProperties,
                isPremium: response.isPremium
            };
            setUser(userData);
            setToken(response.authProperties.token);
            await storeAuthData(userData, response.authProperties.token);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (email: string, password: string, username: string) => {
        try {
            setIsLoading(true);
            const registerData: Register = {
                email,
                password,
                fullName: username,
                phoneNumber: '',
                genderId: 0
            };
            const response = await authService.register(registerData);
            setIsRegistered(true);
            setLoginInformation({ email: registerData.email, password: registerData.password });
            // Don't set user and token yet - wait for OTP verification
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const verifyOtp = async (otp: string) => {
        try {
            setIsLoading(true);
            const response = await authService.verifyOtp(otp);
            if (isRegistered) {
                const userData: User = {
                    userId: response.userId,
                    email: response.email,
                    fullName: response.fullName,
                    roles: response.roles,
                    authProperties: response.authProperties,
                    isPremium: response.isPremium
                };
                setUser(userData);
                setToken(response.authProperties.token);
                await storeAuthData(userData, response.authProperties.token);
                setIsRegistered(false);
            }
        } catch (error) {
            console.error('OTP verification failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }

    };

    const verifyOtpAndLogin = async (otp: string) => {
        try {
            setIsLoading(true);
            if (!loginInformation) {
                throw new Error('Login information not found');
            }
            const response = await authService.verifyOtpAndLogin({
                email: loginInformation.email,
                password: loginInformation.password,
                otp: otp
            });
            if (isRegistered) {
                const userData: User = {
                    userId: response.userId,
                    email: response.email,
                    fullName: response.fullName,
                    roles: response.roles,
                    authProperties: response.authProperties,
                    isPremium: response.isPremium
                };
                setUser(userData);
                setToken(response.authProperties.token);
                await storeAuthData(userData, response.authProperties.token);
                setIsRegistered(false);
            }
        } catch (error) {
            console.error('OTP verification failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const forgotPassword = async (email: string) => {
        try {
            setIsLoading(true);
            await authService.forgotPassword(email);
            setPasswordForgotten(true);
        } catch (error) {
            console.error('Forgot password request failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const resetForgottenPassword = async (newPassword: string) => {
        try {
            setIsLoading(true);
            await authService.resetForgottenPassword(newPassword);
            setPasswordForgotten(false);
        } catch (error) {
            console.error('Reset forgotten password failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const resetPassword = async (currentPassword: string, newPassword: string) => {
        if (!token) {
            throw new Error('No authentication token found');
        }
        try {
            setIsLoading(true);
            await authService.resetPassword(currentPassword, newPassword, token);
        } catch (error) {
            console.error('Reset password failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const refreshToken = async () => {
        try {
            var response = await authService.refreshToken(user?.email, user?.authProperties.clientId);
            const userData: User = {
                userId: response.userId,
                email: response.email,
                fullName: response.fullName,
                roles: response.roles,
                authProperties: response.authProperties,
                isPremium: response.isPremium
            };
            setUser(userData);
            setToken(response.authProperties.token);
            await storeAuthData(userData, response.authProperties.token);
        } catch (error) {
            console.error('Refresh token failed:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            setIsLoading(true);
            if (!user) {
                throw new Error('User not found');
            }
            await authService.logout({ email: user.email, clientId: user.authProperties.clientId });
            setUser(null);
            setToken(null);
            setIsRegistered(false);
            setPasswordForgotten(false);
            await clearAuthData();
        } catch (error) {
            console.error('Logout failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!user && !!token,
                isRegistered,
                passwordForgotten,
                isLoading,
                isPremium: !!user && !!user.isPremium,
                login,
                register,
                verifyOtp,
                verifyOtpAndLogin,
                forgotPassword,
                resetForgottenPassword,
                resetPassword,
                refreshToken,
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