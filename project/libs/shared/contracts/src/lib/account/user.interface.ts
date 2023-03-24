import { AvaliableCity, AvaliableRole } from '.';

export interface User {
  _id?: string;
  firstname: string;
  lastname: string;
  email: string;
  city: AvaliableCity;
  role: AvaliableRole;
  avatar?: string;
  birthDate: string;
  registrationDate?: string;
}
