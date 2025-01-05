'use client';

import { useContractMutation } from '@/hooks/use-contract-mutation';
import { useNavigate } from '@/hooks/use-navigate';
import { routes } from '@/routes';
import { GameMapped, GameStartedEvent } from '@/types/game';

interface UseStartGameParams {
  game: GameMapped
}
export const useStartGame = ({ game }: UseStartGameParams) => {
  const { push } = useNavigate();
  const { onSubmit, isLoading } = useContractMutation<GameStartedEvent>({
    functionName: 'startGame',
    successEvent: 'GameStartedEvent',
    onSuccess: () => {
      return push(routes.dashboard.game({ game: game?.id?.toString() }).home);
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
