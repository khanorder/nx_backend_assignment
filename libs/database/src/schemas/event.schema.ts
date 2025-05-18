import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EventInterface } from '@nx-assignment/common';

export type EventDocument = Event & Document;

@Schema({ timestamps: true })
export class Event implements EventInterface {
  @Prop({ required: true, unique: true })
  eventId: 'SEVENDAYS' | 'THIRTYDAYS' | 'ATTENDANCE' | 'INVITE';

  @Prop({ required: true })
  eventValue: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
