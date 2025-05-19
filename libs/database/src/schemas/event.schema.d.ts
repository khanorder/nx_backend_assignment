import { Document } from 'mongoose';
export type EventDocument = Event & Document;
export declare class Event {
  eventId: 'SEVENDAYS' | 'THIRTYDAYS' | 'ATTENDANCE' | 'INVITE';
  eventValue: string;
}
export declare const EventSchema: import('mongoose').Schema<
  Event,
  import('mongoose').Model<
    Event,
    any,
    any,
    any,
    Document<unknown, any, Event, any> &
      Event & {
        _id: import('mongoose').Types.ObjectId;
      } & {
        __v: number;
      },
    any
  >,
  {},
  {},
  {},
  {},
  import('mongoose').DefaultSchemaOptions,
  Event,
  Document<unknown, {}, import('mongoose').FlatRecord<Event>, {}> &
    import('mongoose').FlatRecord<Event> & {
      _id: import('mongoose').Types.ObjectId;
    } & {
      __v: number;
    }
>;
