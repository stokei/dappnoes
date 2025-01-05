import { Game, GameMapped, GamePiece } from '@/types/game';

const bigIntToNumber = (value: bigint) => Number(value);

const mapGamePieces = (deck: bigint[]) => deck?.map<GamePiece>((piece, position) => ({
  position,
  left: Math.floor(Number(piece) / 10),
  right: Number(piece) % 10,
}));

export const mapGameToGameMapped = (game: Game, currentUserAddress: string): GameMapped => {
  const isActivePlayer = game?.activePlayers?.some(player => player === currentUserAddress);
  return {
    ...game,
    isActivePlayer,
    isOwner: game?.owner === currentUserAddress,
    id: bigIntToNumber(game.id),
    gameDeck: mapGamePieces(game?.gameDeck),
    boardDeck: mapGamePieces(game?.boardDeck),
    playerDeck: mapGamePieces(game?.playerDeck),
  };
};
