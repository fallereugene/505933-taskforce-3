import { Task, AvaliableCity, TaskStatus } from '@project/contracts';

export class TaskEntity implements Task {
  _id?: string;
  title: string;
  description: string;
  category: string;
  cost: number;
  dueDate: string | null;
  image: string;
  address: string;
  tags: string[];
  city: AvaliableCity;
  registrationDate: string;
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
    const {
      _id,
      title,
      description,
      category,
      cost,
      dueDate,
      image,
      address,
      tags,
      city,
      registrationDate,
      status,
      contractor,
      customer,
    } = task;

    this._id = _id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.cost = cost;
    this.dueDate = dueDate;
    this.image = image;
    this.address = address;
    this.tags = tags;
    this.city = city;
    this.registrationDate = registrationDate;
    this.status = status;
    this.contractor = contractor;
    this.customer = customer;
  }

  /**
   * Преобразование данных в объект
   */
  toObject() {
    return { ...this };
  }
}
