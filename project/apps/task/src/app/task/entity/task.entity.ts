import { Task, AvailableCity, TaskStatus } from '@project/contracts';

export class TaskEntity implements Task {
  _id?: string;
  title: string;
  description: string;
  category: string;
  cost: number;
  dueDate: Date;
  image: string;
  address: string;
  tags: string[];
  city: AvailableCity;
  status: TaskStatus;
  contractor: string | null;
  customer: string;

  constructor(task: Task) {
    this.fillEntity(task);
  }

  /**
   * Заполнение данными
   * @param task Объект пользователя
   */
  fillEntity(task: Task) {
    Object.assign(this, task);
  }
}
