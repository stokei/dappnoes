export enum GameStatus {
  PENDING,
  PLAYING,
  CANCELED,
  COMPLETED,
  DRAW
}

export interface Game {
  id: bigint;
  name: string;
  owner: string;
  winner: string;
  status: GameStatus;
  entryFee: bigint;
  maxPlayers: number;
  prizePool: bigint;
  players: string[];
  activePlayers: string[];
  gameDeck: bigint[];
  boardDeck: bigint[];
  playerDeck: bigint[];
}

export interface GamePiece {
  position: number;
  left: number;
  right: number;
}
export interface GameMapped {
  id: number;
  name: string;
  owner: string;
  winner: string;
  status: GameStatus;
  entryFee: bigint;
  maxPlayers: number;
  isOwner: boolean;
  isActivePlayer: boolean;
  prizePool: bigint;
  players: string[];
  activePlayers: string[];
  gameDeck: GamePiece[];
  boardDeck: GamePiece[];
  playerDeck: GamePiece[];
}

export interface CreateGameData {
  name: string;
  entryFee: number;
}

export interface CurrentPlayer {
  playerIndex: number;
  playerPieces: number[];
  gameStatus: GameStatus;
}
export interface GameCreatedEvent {
  gameId: number;
  owner: string;
  entryFee: number;
}

export interface PlayerJoinedEvent {
  gameId: number;
  player: string;
}

export interface GameStartedEvent {
  gameId: number;
}

export interface PlayerMovedEvent {
  gameId: number;
  player: string;
  piece: number;
}

export interface GameCompletedEvent {
  gameId: number;
  winner: string;
}

export interface GameCanceledEvent {
  gameId: number;
}

export interface GameDrawEvent {
  gameId: number;
}

export interface GamesMapping {
  [gameId: number]: Game;
}

export interface BalancesMapping {
  [address: string]: number;
}
