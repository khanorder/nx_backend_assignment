import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { QuestInterface, TypeQuestStatus } from '@nx-assignment/common';

export type QuestDocument = Quest & Document;

@Schema({ timestamps: true })
export class Quest implements QuestInterface {
  @Prop({ required: true, unique: true })
  uid: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  questId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: 'IN_PROGRESS' })
  status: TypeQuestStatus;
}

const QuestSchema = SchemaFactory.createForClass(Quest);
QuestSchema.index({ userId: 1, questId: 1 }, { unique: true });

export { QuestSchema };
