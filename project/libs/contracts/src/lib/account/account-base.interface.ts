import { AvaliableCity, AvaliableRole } from '.';

export interface AccountBase {
  id: string;
  firstname: string;
  lastname: string;
  registrationDate: Date;
  city: AvaliableCity;
  age: number;
  role: AvaliableRole;
  email: string;
  information: string;
}
