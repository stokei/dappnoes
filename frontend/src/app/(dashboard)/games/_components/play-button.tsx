'use client';

import { Button } from '@/components/ui/button';
import { useJoinGame } from '@/hooks/use-join-game';
import { useNavigate } from '@/hooks/use-navigate';
import { useTranslations } from '@/hooks/use-translations';
import { routes } from '@/routes';
import { GameMapped } from '@/types/game';

interface PlayButtonProps {
  game: GameMapped;
}
export const PlayButton = ({ game }: PlayButtonProps) => {
  const translate = useTranslations();
  const { push } = useNavigate();
  const { isLoading: isLoadingJoinGame, onJoinGame } = useJoinGame({ game });
  const isFull = game?.activePlayers?.length === game?.maxPlayers;

  if(game?.isFinished){
    return null;
  }
  if(isFull){
    return (
      <Button disabled>
        {translate.formatMessage({ id: 'full' })}
      </Button>
    );
  }
  if(game?.isActivePlayer){
    return (
      <Button
        onClick={() => push(routes.dashboard.game({ game: game?.id?.toString() }).home)}
      >
        {translate.formatMessage({ id: 'play' })}
      </Button>
    );
  }
  return (
    <Button
      onClick={onJoinGame}
      loading={isLoadingJoinGame}
    >
      {translate.formatMessage({ id: 'buyTicket' })}
    </Button>
  );
};
