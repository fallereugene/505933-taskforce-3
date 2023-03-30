import { AvailableCity } from '../account';
import { TaskStatus } from '.';

export interface Task {
  _id?: string;
  title: string;
  description: string;
  category: string;
  cost: number;
  dueDate: string;
  image: string;
  address: string;
  tags: string[];
  city: AvailableCity;
  registrationDate: string;
  status: TaskStatus;
  customer: string;
  contractor: string;
}
