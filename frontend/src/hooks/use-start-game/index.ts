'use client';

import { useContractMutation } from '@/hooks/use-contract-mutation';
import { GameMapped, GameStartedEvent } from '@/types/game';

interface UseStartGameParams {
  game: GameMapped
}
export const useStartGame = ({ game }: UseStartGameParams) => {
  const { onSubmit, isLoading } = useContractMutation<GameStartedEvent>({
    functionName: 'startGame',
    successEvent: 'GameStarted',
    onSuccess: () => {
      return window.location.reload();
    },
  });

  const onStartGame = async () => {
    if(game){
      onSubmit([game?.id]);
    }
  };

  return {
    onStartGame,
    isLoading
  };
};
