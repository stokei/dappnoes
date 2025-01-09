import { Game, GameMapped, GamePiece, GameStatus } from '@/types/game';

const bigIntToNumber = (value: bigint) => Number(value);

const mapGamePieces = (deck: bigint[]) => deck?.map<GamePiece>((piece, position) => ({
  position,
  left: Math.floor(Number(piece) / 10),
  right: Number(piece) % 10,
}));

export const mapGameToGameMapped = (game: Game, currentUserAddress: string): GameMapped => {
  const isActivePlayer = game?.activePlayers?.some(player => player.playerAddress === currentUserAddress);
  const finishedStatus = [GameStatus.CANCELED, GameStatus.COMPLETED];
  const isFinished = finishedStatus.includes(game.status);
  return {
    ...game,
    isFinished,
    isActivePlayer,
    isOwner: game?.owner === currentUserAddress,
    id: bigIntToNumber(game.id),
    gameDeck: mapGamePieces(game?.gameDeck),
    boardDeck: mapGamePieces(game?.boardDeck),
    playerDeck: mapGamePieces(game?.playerDeck),
  };
};
