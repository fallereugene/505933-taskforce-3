import { AvaliableCity, AvaliableRole } from '.';

export interface Account {
  _id?: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  city: AvaliableCity;
  role: AvaliableRole;
  avatar?: string;
  birthDate: string;
  registrationDate?: string;
}
