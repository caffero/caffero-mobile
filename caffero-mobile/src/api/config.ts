export const API_BASE_URL = 'https://your-api-url.com';

export const API_ENDPOINTS = {
    COFFEE_BEAN: {
        BASE: '/coffee-bean',
        GET_ALL: '/coffee-bean',
        GET: '/coffee-bean/:id',
        CREATE: '/coffee-bean',
        UPDATE: '/coffee-bean/:id',
        DELETE: '/coffee-bean/:id'
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
    }
}; 