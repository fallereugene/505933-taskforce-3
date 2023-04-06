import { AvailableCity, AvailableRole } from '.';

export interface AccountBase {
  id: string;
  firstname: string;
  lastname: string;
  registrationDate: Date;
  city: AvailableCity;
  age: number;
  role: AvailableRole;
  email: string;
  information: string;
}
