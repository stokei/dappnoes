'use client';

import { useEffect, useState } from 'react';
import { useReadContract } from 'wagmi';

import { contractData } from '@/constants/contract-data';
import { useContract } from '@/hooks/use-contract';
import { useWebsocket } from '@/hooks/use-websocket';
import { WebSocketMessages } from '@/services/api/constants/websocket-messages';
import { Game } from '@/services/api/types/game';


export const useGetGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const { socketConnection } = useWebsocket();
  const { contract } = useContract();

  const { data, isError, error, isLoading } = useReadContract({
    address: contract,
    abi: contractData.abi,
    functionName: 'games',
    args: [0],
  });
  console.log({ data, error: error?.shortMessage, isError, isLoading });

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
    games
  };
};
