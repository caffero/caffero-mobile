export const API_BASE_URL = 'http://app-caffero-api-002-egbmbacsdgh3fncg.northeurope-01.azurewebsites.net/api';

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
    SEARCH: {
        BASE: '/search',
        SEARCH: '/search'
    },
    COIN: {
        BASE: '/coin',
        GET_CURRENT_USER: '/coin/current-user',
        INCREASE: '/coin/current-user/increase',
        DECREASE: '/coin/current-user/decrease'
    }
}; 