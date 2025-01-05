import { ZoomIn, ZoomOut } from 'lucide-react';

import { GameStatusBadge } from '@/components/game-status';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Stack } from '@/components/ui/stack';
import { useDevice } from '@/hooks/use-device';
import { GameMapped } from '@/types/game';

import { Enemy } from './enemy';
import { OwnerMenu } from './owner-menu';

export interface ScoreboardProps {
  game: GameMapped;
  gameDeck: GameMapped['gameDeck'];
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export const Scoreboard = ({
  game,
  gameDeck,
  onZoomIn,
  onZoomOut,
}: ScoreboardProps) => {
  const { isMobile } = useDevice();

  return (
    <Card>
      <CardHeader>
        <Stack direction="row" align="center" justify="between">
          <CardTitle>
            {game?.name}
          </CardTitle>
          <GameStatusBadge status={game?.status} />
        </Stack>
      </CardHeader>
      <CardContent>
        <Stack direction="column">
          {game?.activePlayers?.length > 0 && (
            <Stack direction={isMobile ? 'column' : 'row'}>
              {game?.activePlayers?.map(player => (
                <Enemy
                  key={player}
                  address={player}
                  deckCount={0}
                  winner={game?.winner === player}
                />
              ))}
            </Stack>
          )}
          {gameDeck?.length > 0 && (
            <Stack direction="row" align="center">
              {gameDeck?.map((piece) => (
                <div key={piece.position} className="bg-gray-300 w-8 h-16 rounded flex items-center justify-center text-xl font-bold">
                  ?
                </div>
              ))}
            </Stack>
          )}
        </Stack>
      </CardContent>
      <CardFooter>
        <Stack direction="row" justify="end">
          <Button onClick={onZoomIn} size="icon">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button onClick={onZoomOut} size="icon">
            <ZoomOut className="h-4 w-4" />
          </Button>
          {game?.isOwner && (
            <OwnerMenu
              game={game}
            />
          )}
        </Stack>
      </CardFooter>
    </Card>
  );
};
