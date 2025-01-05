'use client';

import { useContractMutation } from '@/hooks/use-contract-mutation';
import { useNavigate } from '@/hooks/use-navigate';
import { routes } from '@/routes';
import { GameCanceledEvent,GameMapped } from '@/types/game';

interface UseCancelGameParams {
  game: GameMapped
}
export const useCancelGame = ({ game }: UseCancelGameParams) => {
  const { push } = useNavigate();
  const { onSubmit, isLoading } = useContractMutation<GameCanceledEvent>({
    functionName: 'cancelGame',
    successEvent: 'GameCanceledEvent',
    onSuccess: () => {
      return push(routes.dashboard.game({ game: game?.id?.toString() }).home);
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
