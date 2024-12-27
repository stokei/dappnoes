'use client';

import { Badge, BadgeProps } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Price } from '@/components/ui/price';
import { Stack } from '@/components/ui/stack';
import { Term, TermLabel, TermValue } from '@/components/ui/term-value';
import { useTranslations } from '@/hooks/use-translations';
import { Game, GameStatus } from '@/services/api/types/game';
import { I18nKey } from '@/types/messages';

const statusColors: Record<GameStatus, BadgeProps['color']> = {
  [GameStatus.WAITING]: 'warning',
  [GameStatus.PLAYING]: 'success',
  [GameStatus.FINISHED]: 'none'
};

interface GamesItemProps {
  game: Game;
}
export const GamesItem = ({ game }: GamesItemProps) => {
  const translate = useTranslations();

  const statusColor = statusColors?.[game.status];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{game.name}</span>
          <Badge color={statusColor}>
            {translate.formatMessage({ id: game.status?.toLowerCase() as I18nKey })}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Stack>
          <Term>
            <TermLabel>
              {translate.formatMessage({ id: 'id' })}
            </TermLabel>
            <TermValue>
              {game.id}
            </TermValue>
          </Term>
          <Term direction="column">
            <TermLabel>
              {translate.formatMessage({ id: 'owner' })}
            </TermLabel>
            <TermValue>
              {game.owner}
            </TermValue>
          </Term>
          <Term>
            <TermLabel>
              {translate.formatMessage({ id: 'players' })}
            </TermLabel>
            <TermValue>
              {game.players}/{game.maxPlayers}
            </TermValue>
          </Term>
        </Stack>
      </CardContent>
      <CardFooter>
        <Stack direction="row" align="center" justify="between">
          <Term direction="column" className="gap-0">
            <TermLabel>
              {translate.formatMessage({ id: 'entryFee' })}
            </TermLabel>
            <TermValue>
              {game.entryFee > 0 ? (
                <Price
                  amount={game.entryFee}
                />
              ) : (
                <Badge color="info">
                  {translate.formatMessage({ id: 'free' })}
                </Badge>
              )}
            </TermValue>
          </Term>
          <Button>
            {translate.formatMessage({ id: 'play' })}
          </Button>
        </Stack>
      </CardFooter>
    </Card>
  );
};
