import { EventScheduleInterface } from '@nx-assignment/common';
import { v4 as uuid } from 'uuid';
import * as dayjs from 'dayjs';
export const seedEventSchedules: EventScheduleInterface[] = [
  { uid: uuid(), eventId: 'SEVENDAYS' },
  { uid: uuid(), eventId: 'THIRTYDAYS' },
  { uid: uuid(), eventId: 'ATTENDANCE_WEEK' },
  { uid: uuid(), eventId: 'INVITE_3' },
  {
    uid: uuid(),
    eventId: 'GET_ITEM',
    startAt: dayjs().toDate(),
    endAt: dayjs().add(30, 'day').toDate(),
  },
];
