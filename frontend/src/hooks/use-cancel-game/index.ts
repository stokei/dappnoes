'use client';

import { useContractMutation } from '@/hooks/use-contract-mutation';
import { GameCanceledEvent, GameMapped } from '@/types/game';

interface UseCancelGameParams {
  game: GameMapped
}
export const useCancelGame = ({ game }: UseCancelGameParams) => {
  const { onSubmit, isLoading } = useContractMutation<GameCanceledEvent>({
    functionName: 'cancelGame',
    successEvent: 'GameCanceled',
    onSuccess: () => {
      return window.location.reload();
    },
  });

  const onCancelGame = async () => {
    if(game){
      onSubmit([game?.id]);
    }
  };

  return {
    onCancelGame,
    isLoading
  };
};
