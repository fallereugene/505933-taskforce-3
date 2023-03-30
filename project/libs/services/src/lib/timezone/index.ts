import { Injectable, Inject } from '@nestjs/common';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { InjectableTimezoneService } from './constants';

@Injectable()
export class Timezone {
  /**
   * UTC-формат
   */
  static UTC_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';

  /**
   * отображаемый формат даты/времени
   */
  static HUMAN_FORMAT = 'DD.MM.YYYY HH:mm';

  constructor(
    @Inject(InjectableTimezoneService.DayJs) private readonly tz: typeof dayjs
  ) {
    dayjs.extend(utc);
    dayjs.extend(timezone);
  }

  /**
   * Получение даты/времени в заданном формате с поправкой на текущий часовой пояс пользователя
   * @param format формат преобразования
   * @param datestring строка даты/времени (utc)
   * @returns Преобразованный формат (utc)
   */
  getDateTimeLocale(
    format = Timezone.HUMAN_FORMAT,
    datestring?: string
  ): string {
    return this.tz.utc(datestring).format(format);
  }
}

export { InjectableTimezoneService };
