import { BaseModule } from '@project/services';
import { TaskRdo } from '@project/contracts';

export class Task extends BaseModule {
  async getListByAccount(url: string) {
    return this.get<TaskRdo[]>(url);
  }
}
