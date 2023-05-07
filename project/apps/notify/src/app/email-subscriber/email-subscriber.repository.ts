import { Subscriber } from '@project/contracts';
import { EmailSubscriberEntity } from './entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EmailSubscriberModel } from './email-subscriber.model';
import { Model } from 'mongoose';

@Injectable()
export class EmailSubscriberRepository {
  constructor(
    @InjectModel(EmailSubscriberModel.name)
    private readonly emailSubscriberModel: Model<EmailSubscriberModel>
  ) {}

  async create(item: EmailSubscriberEntity): Promise<Subscriber> {
    const newEmailSubscriber = new this.emailSubscriberModel(item);
    return newEmailSubscriber.save();
  }

  async destroy(id: string): Promise<void> {
    this.emailSubscriberModel.deleteOne({ _id: id });
  }

  async findById(id: string): Promise<Subscriber | null> {
    return this.emailSubscriberModel.findOne({ _id: id }).exec();
  }

  async update(id: string, item: EmailSubscriberEntity): Promise<Subscriber> {
    return this.emailSubscriberModel
      .findByIdAndUpdate(id, item, { new: true })
      .exec();
  }

  async findByEmail(email: string): Promise<Subscriber | null> {
    return this.emailSubscriberModel.findOne({ email }).exec();
  }
}
