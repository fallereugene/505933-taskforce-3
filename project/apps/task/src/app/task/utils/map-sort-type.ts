import { TaskQuery } from '../validations';

export const mapSortType = (sort: TaskQuery['sorting']): string => {
  switch (sort) {
    case 'popular':
      return 'responses';
    case 'discussing':
      return 'commentsCount';
    default:
      return 'createdAt';
  }
};
