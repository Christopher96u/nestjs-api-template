export enum Environment {
    Development = 'development',
    Production = 'production',
    Test = 'test',
}
export const DEFAULT_NODE_ENV = Environment.Development;
export const DEFAULT_APP_NAME = 'NoteMates';
export const DEFAULT_BACKEND_DOMAIN = 'http://localhost';
export const DEFAULT_API_PREFIX = 'api';
export const DEFAULT_APP_PORT = 3000;
export const DEFAULT_APP_FALLBACK_LANGUAGE = 'en';
export const DEFAULT_APP_HEADER_LANGUAGE = 'x-custom-lang';