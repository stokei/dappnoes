import { Room as RoomEntity,RoomStatus } from '@prisma/client';

import { BaseEntity } from '@/core/abstracts/base-entity';

export class Room extends BaseEntity {
  readonly name: string;
  readonly owner: string;
  readonly entryFee: number;
  readonly maxPlayers: number;
  readonly status: RoomStatus;
  readonly lastMove?: string;
  readonly winner?: string;
  readonly createdAt: string;
  readonly updatedAt: string;

  constructor(data: Omit<RoomEntity, 'id'>, id?: BaseEntity['id']) {
    super({ id });

    this.name = data.name;
    this.owner = data.owner;
    this.entryFee = data.entryFee;
    this.maxPlayers = data.maxPlayers;
    this.status = data.status;
    this.lastMove = data.lastMove;
    this.winner = data.winner;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
