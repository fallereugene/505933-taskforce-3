import { AvailableCity, AvaliableRole } from '.';

export interface Account {
  _id?: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  city: AvailableCity;
  role: AvaliableRole;
  avatar?: string;
  birthDate: string;
  registrationDate?: string;
}
