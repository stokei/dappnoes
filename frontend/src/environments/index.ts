export const NODE_ENV = process.env.NODE_ENV || 'development';
export const IS_DEVELOPMENT = NODE_ENV === 'development';
export const WALLET_CONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '';
export const GANACHE_URL = process.env.NEXT_PUBLIC_NEXT_PUBLIC_GANACHE_URL || '';
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
export const WEBSOCKET_API_URL = process.env.NEXT_PUBLIC_WEBSOCKET_API_URL || 'ws://localhost:4000';
