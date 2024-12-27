'use client';

import { useEffect, useState } from 'react';

import { WebSocketMessages } from '@/constants/websocket-messages';
import { useContractQuery } from '@/hooks/use-contract-query';
import { useWebsocket } from '@/hooks/use-websocket';
import { Game } from '@/types/game';

export const useGetGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const { socketConnection } = useWebsocket();

  const { data, isLoading } = useContractQuery<Game[]>({
    functionName: 'getAllGames',
    args: []
  });

  useEffect(() => {
    if(data?.length){
      setGames(data);
    }
  }, [data]);

  useEffect(() => {
    socketConnection?.on(WebSocketMessages.GAME_CREATED, (newGame: Game) => {
      if(newGame?.id){
        setGames(currentGames => {
          const existsGame = currentGames?.some(game => game.id === newGame.id);
          if(existsGame){
            return currentGames;
          }
          return [newGame, ...currentGames];
        });
      }
    });
  }, [socketConnection]);

  return {
    games,
    isLoading
  };
};
