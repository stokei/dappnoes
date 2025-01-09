'use client';

import { useContractMutation } from '@/hooks/use-contract-mutation';
import { useNavigate } from '@/hooks/use-navigate';
import { routes } from '@/routes';
import { CreateGameData, GameCreatedEvent } from '@/types/game';
import { ethersToWeis } from '@/utils/weis';

export const useCreateGame = () => {
  const { push } = useNavigate();
  const { onSubmit, isLoading } = useContractMutation<GameCreatedEvent>({
    functionName: 'createGame',
    successEvent: 'GameCreated',
    onSuccess: (data) => {
      return push(routes.dashboard.game({ game: Number(data?.gameId)?.toString() }).home);
    },
  });

  const onCreateGame = async (data: CreateGameData) => {
    if(data?.name && data?.entryFee){
      const entryFee = ethersToWeis(data?.entryFee?.toString());
      const isPlayer = true;
      onSubmit([data?.name, entryFee, isPlayer], entryFee);
    }
  };

  return {
    onCreateGame,
    isLoading
  };
};
