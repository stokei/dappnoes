'use client';

import { useMutation } from '@tanstack/react-query';

import { useNavigate } from '@/hooks/use-navigate';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from '@/hooks/use-translations';
import { routes } from '@/routes';
import { apiClient } from '@/services/api/clients/api-client';
import { ApiRestRoutes } from '@/services/api/constants/rest-routes';
import { CreateGameData, Game } from '@/services/api/types/game';

export const useCreateGame = () => {
  const { toast } = useToast();
  const translate = useTranslations();
  const { push } = useNavigate();
  const { mutate } = useMutation<Game, any, CreateGameData>({
    mutationKey: [ApiRestRoutes.CREATE_GAME?.toString()],
    mutationFn: async (data) => {
      return (await apiClient.post(ApiRestRoutes.CREATE_GAME, data))?.data;
    },
    onError(error) {
      toast({
        title: translate.formatMessage({ id: error?.message }),
      });
    },
    onSuccess(game) {
      if(game){
        return push(routes.dashboard.game({ game: game.id }).home);
      }
    },
  });

  const onCreateGame = async (data: CreateGameData) => mutate(data);

  return {
    onCreateGame
  };
};
