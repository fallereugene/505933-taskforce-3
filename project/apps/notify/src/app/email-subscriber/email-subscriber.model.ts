import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Subscriber } from '@project/contracts';

@Schema({
  collection: 'email-subscribers',
  timestamps: true,
})
export class EmailSubscriberModel extends Document implements Subscriber {
  @Prop()
  email: string;

  @Prop()
  firstname: string;

  @Prop()
  lastname: string;
}

export const EmailSubscriberSchema =
  SchemaFactory.createForClass(EmailSubscriberModel);
