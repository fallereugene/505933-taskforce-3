import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Account, AvailableCity, AvailableRole } from '@project/contracts';

@Schema({
  collection: 'accounts',
  timestamps: true,
})
export class AccountModel extends Document implements Account {
  @Prop({ type: String })
  avatar: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({
    required: true,
    type: String,
  })
  city: AvailableCity;

  @Prop({ required: true, type: String })
  role: AvailableRole;

  @Prop({ required: true })
  birthDate: string;
}

export const AccountSchema = SchemaFactory.createForClass(AccountModel);
