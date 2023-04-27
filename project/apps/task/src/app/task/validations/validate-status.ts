import { TaskStatus, AvailableRole } from '@project/contracts';

const AvailableStatusForRole = {
  customer: [
    TaskStatus.New,
    TaskStatus.Cancelled,
    TaskStatus.InProgress,
    TaskStatus.Done,
  ],
  contractor: [TaskStatus.Failed],
};

const validStatus = {
  [TaskStatus.New]: [TaskStatus.InProgress, TaskStatus.Cancelled],
  [TaskStatus.InProgress]: [TaskStatus.Failed, TaskStatus.Done],
  customer: [
    TaskStatus.New,
    TaskStatus.Cancelled,
    TaskStatus.InProgress,
    TaskStatus.Done,
  ],
  contractor: [TaskStatus.Failed],
};

/**
 * Валидация возможности обновить статус
 * При изменении статуса проверяется корректность перехода к новому статусу. Если переход к новому статусу нарушает схему,
 *  возникает ошибка и статус задания не меняется.
 * @param currentStatus Текущий статус задачи
 * @param newStatus Новый статус задачи
 * @param role Роль инициатора запроса
 * @returns Признак возможности смены статуса задачи
 */
export const validateStatus = (
  currentStatus: TaskStatus,
  newStatus: TaskStatus,
  role: AvailableRole
): boolean => {
  return (
    validStatus[currentStatus].includes(newStatus) &&
    AvailableStatusForRole[role].includes(newStatus)
  );
};
