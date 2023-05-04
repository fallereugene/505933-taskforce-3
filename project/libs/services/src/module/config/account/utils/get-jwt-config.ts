import { JwtConfig } from '../contracts';

export const getJwtConfig = (): JwtConfig => {
  return {
    accessTokenSecret: process.env.JWT_SECRET,
    accessTokenExpiresIn: process.env.JWT_EXPIRES_IN,
  };
};
