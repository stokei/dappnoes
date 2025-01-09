'use client';

import { GlobalLoading } from '@/components/global-loading';
import { PrivateRoute } from '@/components/private-route';
import { Container } from '@/components/ui/container';
import { Stack } from '@/components/ui/stack';
import { Title } from '@/components/ui/title';

import { Board } from './_components/board';
import { CurrentPlayer } from './_components/current-player';
import { Scoreboard } from './_components/scoreboard';
import { useGame } from './hooks/use-game';

export default function Page() {
  const {
    game,
    gameErrorMessage,
    scale,
    gameDeck,
    boardDeck,
    playerDeck,
    isLoading,
    onDrop,
    onDragOver,
    onZoomIn,
    onZoomOut,
    onDragStart
  } = useGame();

  return (
    <PrivateRoute
      isLoading={isLoading}
      whenIsConnectedAndAllowedThisRule={game?.isActivePlayer}
    >
      <div className="w-full min-h-screen py-5 relative">
        {isLoading ? (
          <GlobalLoading />
        ) : (
          <Container>
            {game ? (
              <Stack width="full" direction="column">
                <Scoreboard
                  game={game}
                  gameDeck={gameDeck}
                  onZoomIn={onZoomIn}
                  onZoomOut={onZoomOut}
                />
                <Board
                  scale={scale}
                  boardDeck={boardDeck}
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                />
                {!game?.isFinished && (
                  <CurrentPlayer
                    playerDeck={playerDeck}
                    onDragStart={onDragStart}
                  />
                )}
              </Stack>
            ) : (
              <Title>{gameErrorMessage}</Title>
            )}
          </Container>
        )}
      </div>
    </PrivateRoute>
  );
}
