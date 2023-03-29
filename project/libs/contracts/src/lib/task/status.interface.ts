import { AvaliableCity } from '../account';

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
  city: AvaliableCity;
}
