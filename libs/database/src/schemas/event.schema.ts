import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  EventInterface,
  TypeEventId,
  TypeEventPattern,
} from '@nx-assignment/common';

export type EventDocument = Event & Document;

@Schema({ timestamps: true })
export class Event implements EventInterface {
  @Prop({ required: true, unique: true })
  eventId: TypeEventId;

  @Prop({ required: true })
  eventPattern: TypeEventPattern;

  @Prop({ required: true })
  eventValue1: string;

  @Prop()
  eventValue2: string;

  @Prop()
  eventValue3: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
