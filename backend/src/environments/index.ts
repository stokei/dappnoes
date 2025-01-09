import * as dotenv from 'dotenv';
dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const IS_DEVELOPMENT = NODE_ENV === 'development';
export const PORT = parseInt(process.env.PORT) || 4000;
export const HOST = process.env.HOST || '0.0.0.0';
export const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
