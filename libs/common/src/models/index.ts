export const TypeRoleValues = ['USER', 'OPERATOR', 'AUDITOR', 'ADMIN'] as const;
export type TypeRole = (typeof TypeRoleValues)[number];

export const TypeEventIdValues = ['SEVENDAYS', 'THIRTYDAYS', 'ATTENDANCE_WEEK', 'INVITE_3', 'GET_ITEM', 'CLEAR_QUEST'] as const;
export type TypeEventId = (typeof TypeEventIdValues)[number];

export const TypeEventPatternValues = ['ONCE', 'REPEATEDLY', 'PERIOD'] as const;
export type TypeEventPattern = (typeof TypeEventPatternValues)[number];

export interface UserInterface {
  uid: string;
  nick: string;
  roles: TypeRole[];
  refreshToken?: string;
}

export interface EventInterface {
  eventId: TypeEventId;
  eventPattern: TypeEventPattern;
  eventValue1: string;
  eventValue2: string;
  eventValue3: string;
}

export interface EventScheduleInterface {
  uid: string;
  eventId: TypeEventId;
  startAt?: Date;
  endAt?: Date;
}

export class SignInResult {
  constructor(
    public accessToken: string,
    public refreshToken: string,
  ) {}
}

export enum TypeToken {
  Access = 0,
  Refresh = 1,
}
