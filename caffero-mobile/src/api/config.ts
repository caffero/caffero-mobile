import Constants from 'expo-constants';
const { expoConfig } = Constants;

let API_BASE_URL: string;
let url: string;

switch (expoConfig?.extra?.ENVIRONMENT) {
    case 'prod':
        url = expoConfig?.extra?.API_BASE_URL;
        API_BASE_URL = url.endsWith('/api') ? url : `${url}/api`;
        break;
    case 'dev':
        url = expoConfig?.extra?.API_BASE_URL;
        API_BASE_URL = url.endsWith('/api') ? url : `${url}/api`;
        break;
    case 'local':
        const localIP = expoConfig?.hostUri?.split(':')[0];  
        API_BASE_URL = `http://${localIP}:6001/api`;
        break;
    default:
        API_BASE_URL = expoConfig?.extra?.API_BASE_URL;
}

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
        BASE: '/user-equipment',
        GET_ALL: '/user-equipment',
        GET: '/user-equipment/:id',
        CREATE: '/user-equipment',
        UPDATE: '/user-equipment/:id',
        DELETE: '/user-equipment/:id',
        GET_TYPES: '/equipment',
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
    ROASTERY: {
        BASE: '/roastery',
        GET_ALL: '/roastery',
        GET: '/roastery/:id',
        CREATE: '/roastery',
        UPDATE: '/roastery/:id',
        DELETE: '/roastery/:id',
        BEANS: '/roastery/:id/beans'
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