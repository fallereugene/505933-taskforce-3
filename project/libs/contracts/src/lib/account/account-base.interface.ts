import { AvailableCity, AvaliableRole } from '.';

export interface AccountBase {
  id: string;
  firstname: string;
  lastname: string;
  registrationDate: Date;
  city: AvailableCity;
  age: number;
  role: AvaliableRole;
  email: string;
  information: string;
}
