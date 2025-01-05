'use client';

import { useEffect, useState } from 'react';

import { useContractQuery } from '@/hooks/use-contract-query';
import { useNavigate } from '@/hooks/use-navigate';
import { Game, GameMapped } from '@/types/game';
import { mapGameToGameMapped } from '@/utils/game';

import { useUser } from '../use-user';

export const useGetGame = () => {
  const [game, setGame] = useState<GameMapped>();

  const { accountAddress } = useUser();
  const { params } = useNavigate<{ gameId: string }>();
  const gameId = params?.gameId;

  const { data, errorMessage, isLoading } = useContractQuery<Game>({
    enabled: !!gameId,
    functionName: 'getGame',
    args: gameId ? [Number(gameId)] : []
  });

  useEffect(() => {
    if(data && accountAddress){
      setGame(mapGameToGameMapped(data, accountAddress));
    }
  }, [accountAddress, data]);

  return {
    game,
    errorMessage,
    isLoading
  };
};
