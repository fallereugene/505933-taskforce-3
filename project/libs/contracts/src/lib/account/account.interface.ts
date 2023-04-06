import { AvailableCity, AvailableRole } from '.';

export interface Account {
  _id?: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  city: AvailableCity;
  role: AvailableRole;
  avatar?: string;
  birthDate: string;
  registrationDate?: string;
}
