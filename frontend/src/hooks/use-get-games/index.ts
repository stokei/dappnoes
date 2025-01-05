'use client';

import { useEffect, useState } from 'react';

import { useContractQuery } from '@/hooks/use-contract-query';
import { Game, GameMapped } from '@/types/game';
import { mapGameToGameMapped } from '@/utils/game';

import { useUser } from '../use-user';

export const useGetGames = () => {
  const [games, setGames] = useState<GameMapped[]>([]);

  const { accountAddress } = useUser();
  const { data, isLoading } = useContractQuery<Game[]>({
    functionName: 'getAllGames',
    args: []
  });

  useEffect(() => {
    if(data?.length && accountAddress){
      setGames(data?.map(game => mapGameToGameMapped(game, accountAddress)));
    }
  }, [accountAddress, data]);

  return {
    games,
    isLoading
  };
};
