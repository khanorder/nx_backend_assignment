import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ItemInterface } from '@nx-assignment/common';

export type ItemDocument = Item & Document;

@Schema({ timestamps: true })
export class Item implements ItemInterface {
  @Prop({ required: true, unique: true })
  uid: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  itemId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  count: number;
}

const ItemSchema = SchemaFactory.createForClass(Item);
ItemSchema.index({ userId: 1, itemId: 1 }, { unique: true });

export { ItemSchema };
