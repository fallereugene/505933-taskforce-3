import { Review, Task, TaskStatus } from '@project/contracts';

/**
 * Расчет рейтинга исполнителя.
 * Рейтинг исполнителя рассчитывается по формуле:
 * сумма всех оценок из отзывов / (количество отзывов + счетчик проваленных заданий).
 * @param reviewList Список отзывов
 * @param taskList Список заданий
 * @returns Рассчитанный рейтинг
 */
export const calculateRating = (
  reviewList: Omit<Review, 'contractor'>[],
  taskList: Task[]
) => {
  const failedTasksQuantity = taskList.filter(
    (task) => task.status === TaskStatus.Failed
  ).length;
  const ratingSum = reviewList.reduce((a, v, i) => (a += v.rating), 0);

  return parseFloat(
    (ratingSum / (reviewList.length + failedTasksQuantity)).toFixed(2)
  );
};
