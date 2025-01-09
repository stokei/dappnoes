import { DragEvent, useEffect, useState } from 'react';

import { useGetGame } from '@/hooks/use-get-game';
import { GameMapped, GamePiece } from '@/types/game';

export const useGame = () => {
  const [scale, setScale] = useState<number>(1);
  const [gameDeck, setGameDeck] = useState<GameMapped['gameDeck']>([]);
  const [boardDeck, setBoardDeck] = useState<GameMapped['boardDeck']>([]);
  const [playerDeck, setPlayerDeck] = useState<GameMapped['playerDeck']>([]);
  const { game, errorMessage: gameErrorMessage, isLoading } = useGetGame();

  useEffect(() => {
    const loadDecks = () => {
      setGameDeck(game?.gameDeck || []);
      setBoardDeck(game?.boardDeck || []);
      setPlayerDeck(game?.playerDeck || []);
    };
    loadDecks();
  }, [game]);

  const onZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 2));
  };

  const onZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };

  const onDragStart = (e: DragEvent<HTMLDivElement>, piece: GamePiece) => {
    e.dataTransfer.setData('piece', JSON.stringify(piece));
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const piece = JSON.parse(e.dataTransfer.getData('piece'));
    setBoardDeck(prev => [...prev, piece]);
    setPlayerDeck(prev => prev.filter(p => p.position !== piece.position));
  };

  return {
    scale,
    game,
    gameErrorMessage,
    gameDeck,
    boardDeck,
    playerDeck,
    isLoading,
    onZoomIn,
    onZoomOut,
    onDragStart,
    onDragOver,
    onDrop,
  };
};
