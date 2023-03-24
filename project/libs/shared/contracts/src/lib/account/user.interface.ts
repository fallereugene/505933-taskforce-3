import { AvaliableCity, AvaliableRole } from '.';

export interface User {
  _id?: string;
  firstname: string;
  lastname: string;
  email: string;
  city: AvaliableCity;
  role: AvaliableRole;
  avatar?: string;
  birthDate: Date;
  registrationDate?: Date;
}
