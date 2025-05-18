export type TypeRole = 'USER' | 'OPERATOR' | 'AUDITOR' | 'ADMIN';

export interface UserInterface {
    uid: BigInt;
    nick: string;
    roles: TypeRole[];
}

export interface EventInterface {
    eventId: string;
    eventValue: string;
}

export enum TypeToken {
    Access = 0,
    Refresh = 1
}