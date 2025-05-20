import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  EventScheduleInterface,
  TypeEventId,
  TypeEventPattern,
} from '@nx-assignment/common';

export type EventScheduleDocument = EventSchedule & Document;

@Schema({ timestamps: true })
export class EventSchedule implements EventScheduleInterface {
  @Prop({ required: true, unique: true })
  uid: string;

  @Prop({ required: true })
  eventId: TypeEventId;

  @Prop()
  startAt: Date;

  @Prop()
  endAt: Date;
}

export const EventScheduleSchema = SchemaFactory.createForClass(EventSchedule);
