'use client';

import { UseContractMutation, useContractMutation } from '@/hooks/use-contract-mutation';
import { GameMapped, GamePiece, PlayerMovedEvent } from '@/types/game';

interface UseMakeMoveGameParams {
  game: GameMapped;
  onSuccess: UseContractMutation<PlayerMovedEvent>['onSuccess'];
}
export const useMakeMoveGame = ({ game, onSuccess }: UseMakeMoveGameParams) => {
  const { onSubmit, isLoading } = useContractMutation<PlayerMovedEvent>({
    functionName: 'makeMove',
    successEvent: 'PlayerMoved',
    onSuccess,
  });

  const onMakeMoveGame = async (piece: GamePiece) => {
    if(game && piece){
      onSubmit([game?.id, piece.left, piece.right]);
    }
  };

  return {
    onMakeMoveGame,
    isLoading
  };
};
