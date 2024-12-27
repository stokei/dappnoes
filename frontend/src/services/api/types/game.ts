export enum GameStatus {
  WAITING= 'WAITING',
  PLAYING= 'PLAYING',
  FINISHED= 'FINISHED'
}

export interface Game {
  id: string;
  name: string;
  owner: string;
  entryFee: number;
  players: number;
  maxPlayers: number;
  status: GameStatus;
  lastMove?: string;
  winner?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGameData {
  name: string;
  owner: string;
  entryFee: number;
  maxPlayers: number;
}
