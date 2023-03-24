import { AccountBase } from '.';

export interface AccountContractor extends AccountBase {
  rating: number;
  completed: number;
  failed: number;
  specialization: string;
  ratingPosition: PositionAlignSetting;
}
