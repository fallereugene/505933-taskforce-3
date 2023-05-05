export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APPLICATION_PORT: string;
      // url адреса сервисов
      URL_SERVICE_TASK: string;
      URL_SERVICE_REVIEW: string;
      URL_SERVICE_ACCOUNT: string;
      URL_SERVICE_COMMENT: string;
      // переменные mongo
      MONGO_INITDB_ROOT_USERNAME: string;
      MONGO_INITDB_ROOT_PASSWORD: string;
      MONGO_INITDB_DATABASE: string;
      DB_AUTH_BASE: string;
      DB_HOST: string;
      DB_PORT: string;
      // переменные mongo-express
      ME_CONFIG_BASICAUTH_USERNAME: string;
      ME_CONFIG_BASICAUTH_PASSWORD: string;
      ME_CONFIG_MONGODB_ADMINUSERNAME: string;
      ME_CONFIG_MONGODB_ADMINPASSWORD: string;
      ME_CONFIG_MONGODB_URL: string;
      // JWT-токенизация
      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;
      // POSTGRES
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DB: string;
      PGADMIN_DEFAULT_EMAIL: string;
      PGADMIN_DEFAULT_PASSWORD: string;
      PGADMIN_CONFIG_SERVER_MODE: string;
      // rabbit mq
      RABBITMQ_DEFAULT_USER: string;
      RABBITMQ_DEFAULT_PASS: string;
      RABBITMQ_HOST: string;
      RABBITMQ_PORT: string;
      RABBITMQ_QUEUE: string;
      RABBITMQ_EXCHANGE: string;
      // SMTP-сервер
      MAIL_SMTP_HOST: string;
      MAIL_SMTP_PORT: string;
      MAIL_USER_NAME: string;
      MAIL_USER_PASSWORD: string;
      MAIL_FROM: string;
      // uploader сервис
      UPLOAD_DIRECTORY: string;
      SERVE_STATIC: string;
    }
  }
}
