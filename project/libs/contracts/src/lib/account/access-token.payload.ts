import { AvailableRole } from './';

export interface TokenPayload {
  sub: string;
  email: string;
  role: AvailableRole;
  lastname: string;
  firstname: string;
}
