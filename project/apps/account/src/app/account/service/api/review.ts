import { BaseModule } from '@project/services';
import { ReviewRdo, RatingListRdo, AvailableRole } from '@project/contracts';

export class Review extends BaseModule {
  async getList(url: string, role: AvailableRole) {
    return this.get<ReviewRdo[]>(`${url}?role=${role}`);
  }

  async getRatingList(url: string) {
    return this.get<RatingListRdo[]>(url);
  }
}
