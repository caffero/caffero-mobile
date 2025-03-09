//export const API_BASE_URL = 'https://app-caffero-api-02-d2bvd8gyf6bpeve5.northeurope-01.azurewebsites.net/api';

import Constants from 'expo-constants';
const BASE_URL = Constants.expoConfig?.hostUri 
  ? `http://${Constants.expoConfig.hostUri.split(':')[0]}:6001` 
  : 'http://localhost:6001';

export const API_BASE_URL = `${BASE_URL}/api`;

export const API_ENDPOINTS = {
    ACCOUNT: {
        LOGIN: '/account/login',
        REGISTER: '/account/register-user',
        LOGOUT: '/account/logout',
        REFRESH_TOKEN: '/account/refresh-token',
        PROFILE: '/account/profile',
        VERIFY_OTP: '/account/verify-otp',
        VERIFY_OTP_AND_LOGIN: '/account/verify-otp-and-login',
        FORGOT_PASSWORD: '/account/forgot-password',
        RESET_FORGOTTEN_PASSWORD: '/account/reset-forgotten-password',
        RESET_PASSWORD: '/account/reset-password'
    },
    COFFEE_BEAN: {
        BASE: '/coffee-bean',
        GET_ALL: '/coffee-bean',
        GET: '/coffee-bean/:id',
        CREATE: '/coffee-bean',
        UPDATE: '/coffee-bean/:id',
        DELETE: '/coffee-bean/:id'
    },
    COFFEE: {
        BASE: '/coffee',
        GET_ALL: '/coffee',
        GET: '/coffee/:id',
        CREATE: '/coffee',
        UPDATE: '/coffee/:id',
        DELETE: '/coffee/:id'
    },
    EQUIPMENT: {
        BASE: '/equipment',
        GET_ALL: '/equipment',
        GET: '/equipment/:id',
        CREATE: '/equipment',
        UPDATE: '/equipment/:id',
        DELETE: '/equipment/:id'
    },
    POST: {
        BASE: '/post',
        GET_ALL: '/post',
        GET: '/post/:id',
        CREATE: '/post',
        UPDATE: '/post/:id',
        DELETE: '/post/:id'
    },
    RECIPE: {
        BASE: '/recipe',
        GET_ALL: '/recipe',
        GET: '/recipe/:id',
        CREATE: '/recipe',
        UPDATE: '/recipe/:id',
        DELETE: '/recipe/:id'
    },
    USER: {
        BASE: '/user',
        GET: '/user/:id',
        UPDATE: '/user/:id',
        DELETE: '/user/:id'
    },
    CONTACT: {
        BASE: '/contact',
        CREATE: '/contact'
    },
    PRODUCT: {
        BASE: '/product',
        CREATE: '/product'
    },
    LANGUAGE: {
        BASE: '/language',
        GET_ALL: '/language',
        GET_LOCALIZATIONS: '/language/:id/localizations'
    },
    HOME: {
        BASE: '/home',
        SEARCH: '/home/search'
    },
    COIN: {
        BASE: '/coin',
        GET_CURRENT_USER: '/coin/current-user',
        INCREASE: '/coin/current-user/increase',
        DECREASE: '/coin/current-user/decrease'
    }
};

export const API_TIMEOUT = 30000; // 30 seconds
export const DEFAULT_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}; 