import { AccessTokenPayload, Account } from '@project/contracts';

export const createJWTPayload = (
  user: AccessTokenPayload
): AccessTokenPayload => {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    lastname: user.lastname,
    firstname: user.firstname,
  };
};
