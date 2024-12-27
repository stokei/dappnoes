'use client';

import { useTranslations } from '@/hooks/use-translations';
import { GameStatus } from '@/types/game';

import { Badge } from '../ui/badge';

import { getGameStatus } from './mappers/get-game-status';

interface GameStatusBadgeProps {
  status: GameStatus;
}
export const GameStatusBadge = ({ status }: GameStatusBadgeProps) => {
  const translate = useTranslations();
  const statusData = getGameStatus(status);
  return (
    <Badge color={statusData?.color}>
      {translate.formatMessage({
        id: statusData.text
      })}
    </Badge>
  );
};
