
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class ReserveInput {
    roomId?: number;
    startedAt?: number;
    endedAt?: number;
}

export abstract class IMutation {
    abstract createReserve(reserve?: ReserveInput): string | Promise<string>;
}

export abstract class IQuery {
    abstract getReserves(): Reserve[] | Promise<Reserve[]>;

    abstract getEmptyRoom(time?: string): Room | Promise<Room>;
}

export class Reserve {
    id?: number;
    startedAt?: string;
    endedAt?: string;
    user?: User;
    room?: Room;
}

export class Room {
    id?: number;
    name?: string;
    size?: string;
}

export class User {
    id?: number;
    name?: string;
    team?: string;
}
