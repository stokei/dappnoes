import { BadgeProps } from '@/components/ui/badge';
import { GameStatus } from '@/types/game';
import { I18nKey } from '@/types/messages';

interface GetGameStatusResponse {
  text: I18nKey;
  color: BadgeProps['color']
}

export const getGameStatus = (value: GameStatus): GetGameStatusResponse => {
  const enums: Record<GameStatus, GetGameStatusResponse> = {
    [GameStatus.PENDING]: {
      text: 'pending',
      color: 'warning',
    },
    [GameStatus.WAITING_FOR_PLAYERS]: {
      text: 'waitingForPlayers',
      color: 'warning',
    },
    [GameStatus.PLAYING]: {
      text: 'playing',
      color: 'success',
    },
    [GameStatus.CANCELED]: {
      text: 'canceled',
      color: 'info',
    },
    [GameStatus.COMPLETED]: {
      text: 'completed',
      color: 'info',
    },
    [GameStatus.DRAW]: {
      text: 'draw',
      color: 'info',
    },
  };

  return enums[value];
};
