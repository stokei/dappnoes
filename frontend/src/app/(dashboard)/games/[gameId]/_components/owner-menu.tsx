import { Button } from '@/components/ui/button';
import { Stack } from '@/components/ui/stack';
import { useCancelGame } from '@/hooks/use-cancel-game';
import { useStartGame } from '@/hooks/use-start-game';
import { useTranslations } from '@/hooks/use-translations';
import { GameMapped, GameStatus } from '@/types/game';


export interface OwnerMenuProps {
  game: GameMapped;
}

export const OwnerMenu = ({
  game,
}: OwnerMenuProps) => {
  const translate = useTranslations();
  const {
    isLoading: isLoadingCancelGame,
    onCancelGame,
  } = useCancelGame({
    game
  });
  const {
    isLoading: isLoadingStartGame,
    onStartGame,
  } = useStartGame({
    game
  });
  return (
    <Stack width="fit" direction="row">
      {game?.status === GameStatus.PENDING && (
        <Button
          loading={isLoadingStartGame}
          onClick={onStartGame}
          disabled={game?.activePlayers?.length < 2}
        >
          {translate.formatMessage({ id: 'startGame' })}
        </Button>
      )}
      {game?.status === GameStatus.PLAYING && (
        <Button
          loading={isLoadingCancelGame}
          onClick={onCancelGame}
        >
          {translate.formatMessage({ id: 'cancelGame' })}
        </Button>
      )}
    </Stack>
  );
};
