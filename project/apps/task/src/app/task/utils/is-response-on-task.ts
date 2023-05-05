import { UpdateTaskDto } from '../dto';
import { TaskStatus, Task, AvailableRole } from '@project/contracts';

export const isResponseOnTask = (
  role: AvailableRole,
  payload: UpdateTaskDto,
  taskRecord: Task
) => {
  return (
    role === 'contractor' &&
    payload.contractor &&
    taskRecord.status === TaskStatus.New &&
    payload.status === TaskStatus.New
  );
};
