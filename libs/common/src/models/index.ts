export const TypeRoleValues = ['USER', 'OPERATOR', 'AUDITOR', 'ADMIN'] as const;
export type TypeRole = (typeof TypeRoleValues)[number];

export const TypeEventIdValues = [
  'SEVENDAYS',
  'THIRTYDAYS',
  'ATTENDANCE_WEEK',
  'INVITE_3',
  'GET_ITEM',
  'CLEAR_QUEST',
] as const;
export type TypeEventId = (typeof TypeEventIdValues)[number];

export const TypeEventPatternValues = ['ONCE', 'REPEATEDLY', 'PERIOD'] as const;
export type TypeEventPattern = (typeof TypeEventPatternValues)[number];

export const TypeQuestStatusValues = ['IN_PROGRESS', 'COMPLETE'] as const;
export type TypeQuestStatus = (typeof TypeQuestStatusValues)[number];

export class TokenResult {
  constructor(
      public token: string = '',
      public jwtId: string = '',
  ) {}
}

export interface UserInterface {
  uid: string;
  nick: string;
  roles: TypeRole[];
  refreshTokenId?: string;
}

export class UserDTO implements UserInterface {
  constructor(
    public uid: string,
    public nick: string,
    public roles: TypeRole[],
    public refreshTokenId?: string,
  ) {}
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

export interface ItemInterface {
  uid: string;
  userId: string;
  itemId: string;
  name: string;
  count: number;
}

export interface QuestInterface {
  uid: string;
  userId: string;
  questId: string;
  name: string;
  status: TypeQuestStatus;
}

export class SignInResult {
  constructor(
    public accessToken: string = '',
    public accessTokenId: string = '',
    public refreshToken: string = '',
    public refreshTokenId: string = '',
  ) {}
}

export enum TypeToken {
  Access = 0,
  Refresh = 1,
}
