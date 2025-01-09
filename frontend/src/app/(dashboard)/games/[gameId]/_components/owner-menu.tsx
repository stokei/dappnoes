import { Button } from '@/components/ui/button';
import { Stack } from '@/components/ui/stack';
import { useCancelGame } from '@/hooks/use-cancel-game';
import { useStartGame } from '@/hooks/use-start-game';
import { useTranslations } from '@/hooks/use-translations';
import { useWithdrawGame } from '@/hooks/use-withdraw-game';
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
  const {
    isLoading: isLoadingWithdrawGame,
    onWithdrawGame,
  } = useWithdrawGame();

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
      {game?.isFinished && (
        <Button
          loading={isLoadingWithdrawGame}
          onClick={onWithdrawGame}
        >
          {translate.formatMessage({ id: 'withdrawPrizePool' })}
        </Button>
      )}
    </Stack>
  );
};
