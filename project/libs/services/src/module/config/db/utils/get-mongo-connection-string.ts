import { DatabaseConfig } from '../contracts';

/**
 * Строка подключения к базе данных
 * @param param0 Объект данных для подключения: имя базы данных, хост, порт и т.д.
 * @returns Нормализваонная строка подключения
 */
export const getMongoConnectionString = ({
  name,
  user,
  password,
  host,
  port,
  authBase,
}: DatabaseConfig): string => {
  return `mongodb://${user}:${password}@${host}:${port}/${name}?authSource=${authBase}`;
};
