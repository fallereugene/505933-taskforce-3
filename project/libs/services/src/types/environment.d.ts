export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_INITDB_ROOT_USERNAME: string;
      MONGO_INITDB_ROOT_PASSWORD: string;
      MONGO_INITDB_DATABASE: string;
      ME_CONFIG_BASICAUTH_USERNAME: string;
      ME_CONFIG_BASICAUTH_PASSWORD: string;
      ME_CONFIG_MONGODB_ADMINUSERNAME: string;
      ME_CONFIG_MONGODB_ADMINPASSWORD: string;
      ME_CONFIG_MONGODB_URL: string;
      DB_AUTH_BASE: string;
      DB_HOST: string;
      DB_PORT: string;
      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;
      URL_SERVICE_ACCOUNT: string;
      URL_SERVICE_TASK: string;
    }
  }
}
