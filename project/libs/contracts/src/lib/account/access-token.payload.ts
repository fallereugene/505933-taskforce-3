import { AvailableRole } from './';

export interface AccessTokenPayload {
  id: string;
  email: string;
  role: AvailableRole;
  lastname: string;
  firstname: string;
}
