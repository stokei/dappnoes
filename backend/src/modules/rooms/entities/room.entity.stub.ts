import { RoomStatus } from '@prisma/client';

import { Room } from './room.entity';

export const createRoomStub = (overrides?: Partial<Room>): Room => {
  const now = new Date().toISOString();
  return new Room({
    name: 'Room 1',
    owner: 'owner-address',
    entryFee: 10,
    maxPlayers: 4,
    status: RoomStatus.WAITING,
    lastMove: null,
    winner: null,
    createdAt: now,
    updatedAt: now,
    ...overrides,
  }, overrides?.id);
};
