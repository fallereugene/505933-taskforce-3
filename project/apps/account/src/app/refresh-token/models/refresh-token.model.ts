import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Token } from '@project/contracts';

@Schema({
  collection: 'refresh-sessions',
  timestamps: true,
})
export class RefreshTokenModel extends Document implements Token {
  @Prop()
  createdAt: Date;

  @Prop({ required: true })
  tokenId: string;

  @Prop({ required: true })
  expiresIn: Date;
}

export const RefreshTokenSchema =
  SchemaFactory.createForClass(RefreshTokenModel);
