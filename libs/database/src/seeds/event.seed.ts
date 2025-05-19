import { EventInterface } from '@nx-assignment/common';
export const seedEvents: EventInterface[] = [
  { eventId: 'SEVENDAYS', eventPattern: 'REPEATEDLY', eventValue1: '7', eventValue2: '', eventValue3: '' },
  { eventId: 'THIRTYDAYS', eventPattern: 'REPEATEDLY', eventValue1: '3', eventValue2: '', eventValue3: '' },
  { eventId: 'ATTENDANCE_WEEK', eventPattern: 'REPEATEDLY', eventValue1: '7', eventValue2: '', eventValue3: '' },
  { eventId: 'INVITE_3', eventPattern: 'ONCE', eventValue1: '3', eventValue2: '', eventValue3: '' },
  { eventId: 'GET_ITEM', eventPattern: 'PERIOD', eventValue1: '100100001', eventValue2: '100', eventValue3: '' },
  { eventId: 'CLEAR_QUEST', eventPattern: 'ONCE', eventValue1: '100301001', eventValue2: '', eventValue3: '' },
];
