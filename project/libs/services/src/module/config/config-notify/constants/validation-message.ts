export enum EnvValidationMessage {
  EnvironmentRequired = 'Environment is required',
  ApplicationPort = 'Application port is required',
  DBHostRequired = 'DB_HOST is required',
  DBNameRequired = 'DB_NAME is required',
  DBPortRequired = 'DB_PORT is required',
  DBUserRequired = 'DB_USER is required',
  DBPasswordRequired = 'DB_PASSWORD is required',
  DBBaseAuthRequired = 'DB_AUTH_BASE is required',
  rmqUserRequired = 'RABBITMQ_DEFAULT_USER is required',
  rmqPasswordRequired = 'RABBITMQ_DEFAULT_PASS is required',
}
