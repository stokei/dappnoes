export enum RoomStatus {
  WAITING= 'WAITING',
  PLAYING= 'PLAYING',
  FINISHED= 'FINISHED'
}

export interface Room {
  id: string;
  name: string;
  owner: string;
  entryFee: number;
  maxPlayers: number;
  status: RoomStatus;
  lastMove?: string;
  winner?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoomData {
  name: string;
  owner: string;
  entryFee: number;
  maxPlayers: number;
}
