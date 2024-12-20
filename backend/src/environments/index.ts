export const NODE_ENV = process.env.NODE_ENV || 'development';
export const IS_DEVELOPMENT = NODE_ENV === 'development';
export const PORT = parseInt(process.env.PORT) || 4000;
export const HOST = process.env.HOST || '0.0.0.0';
