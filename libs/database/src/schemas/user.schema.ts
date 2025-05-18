import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true, unique: true })
  uid: BigInt;

  @Prop({ required: true })
  nick: string;

  @Prop({ default: 'USER' })
  role: 'USER' | 'OPERATOR' | 'AUDITOR' | 'ADMIN';
}

export const UserSchema = SchemaFactory.createForClass(User);
