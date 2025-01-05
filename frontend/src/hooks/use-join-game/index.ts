'use client';

import { useContractMutation } from '@/hooks/use-contract-mutation';
import { useNavigate } from '@/hooks/use-navigate';
import { routes } from '@/routes';
import { GameMapped, PlayerJoinedEvent } from '@/types/game';

interface UseJoinGameParams {
  game: GameMapped
}
export const useJoinGame = ({ game }: UseJoinGameParams) => {
  const { push } = useNavigate();
  const { onSubmit, isLoading } = useContractMutation<PlayerJoinedEvent>({
    functionName: 'joinGame',
    successEvent: 'PlayerJoinedEvent',
    onSuccess: () => {
      return push(routes.dashboard.game({ game: game?.id?.toString() }).home);
    },
  });

  const onJoinGame = async () => {
    if(game){
      onSubmit([game?.id], game?.entryFee);
    }
  };

  return {
    onJoinGame,
    isLoading
  };
};
