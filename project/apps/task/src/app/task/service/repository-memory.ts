import { Injectable } from '@nestjs/common';
import { Task } from '@project/contracts';
import { TaskEntity } from '../entity';
import { RepositoryInMemory } from '@project/services';

@Injectable()
export class RepositoryMemory extends RepositoryInMemory<TaskEntity, Task> {
  /**
   * Получение коллекции
   * @returns
   */
  async getRepository(): Promise<Task[]> {
    return Object.values(this.repository);
  }
}
