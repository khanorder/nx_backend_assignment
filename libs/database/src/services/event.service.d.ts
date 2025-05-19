import { Model } from 'mongoose';
import { EventDocument } from '../schemas/event.schema';
export declare class EventService {
  private eventModel;
  constructor(eventModel: Model<EventDocument>);
}
