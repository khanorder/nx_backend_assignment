import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserInterface, TypeRole } from '@nx-assignment/common';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User implements UserInterface {
  @Prop({ type: String, required: true, unique: true })
  uid: BigInt;

  @Prop({ required: true })
  nick: string;

  @Prop({ type: [], default: ['USER'] })
  roles: TypeRole[];
}

export const UserSchema = SchemaFactory.createForClass(User);
