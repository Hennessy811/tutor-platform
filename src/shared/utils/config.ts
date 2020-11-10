export const isDevelopment = process.env.NODE_ENV === 'development';

export const BACKEND_URL = isDevelopment
  ? 'http://localhost:1337'
  : 'https://strapi.cskeleto.dev';
