//lets pages call fetch in dev & prod using API_BASE_URL
export const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://https://nyseer-ecommerce-site.vercel.app/'
    : 'http://localhost:3001';