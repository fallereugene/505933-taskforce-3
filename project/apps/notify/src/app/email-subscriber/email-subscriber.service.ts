import { EmailSubscriberEntity } from './entity';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository
  ) {}

  async addSubscriber(subscriber: CreateSubscriberDto) {
    const { email } = subscriber;
    const existsSubscriber = await this.emailSubscriberRepository.findByEmail(
      email
    );
    console.log(`existsSubscriber`, existsSubscriber);
    if (existsSubscriber) {
      return existsSubscriber;
    }

    return this.emailSubscriberRepository.create(
      new EmailSubscriberEntity(subscriber)
    );
  }
}
