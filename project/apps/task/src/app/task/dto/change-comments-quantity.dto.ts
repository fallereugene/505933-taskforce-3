import { IsNumber } from 'class-validator';

export class ChangeCommentsCount {
  @IsNumber()
  taskId: number;

  @IsNumber()
  commentsQuantity: number;
}
