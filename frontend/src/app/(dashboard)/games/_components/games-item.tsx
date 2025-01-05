import { GameStatusBadge } from '@/components/game-status';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Price } from '@/components/ui/price';
import { Stack } from '@/components/ui/stack';
import { Term, TermLabel, TermValue } from '@/components/ui/term-value';
import { useTranslations } from '@/hooks/use-translations';
import { GameMapped } from '@/types/game';

import { PlayButton } from './play-button';

interface GamesItemProps {
  game: GameMapped;
}
export const GamesItem = ({ game }: GamesItemProps) => {
  const translate = useTranslations();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{game.name}</span>
          <GameStatusBadge status={game.status} />
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
              {game.activePlayers?.length}/{game.maxPlayers}
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
              {game.entryFee ? (
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
          <PlayButton
            game={game}
          />
        </Stack>
      </CardFooter>
    </Card>
  );
};
