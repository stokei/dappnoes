'use client';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';
import { Stack } from '@/components/ui/stack';
import { useTranslations } from '@/hooks/use-translations';

import { useGetGames } from '../_hooks/use-get-games';

import { CreateGameDrawer } from './create-game-drawer';
import { GamesItem } from './games-item';

export const GamesList = () => {
  const translate = useTranslations();
  const { games } = useGetGames();

  return (
    <Stack>
      <Drawer>
        <div className="w-full flex justify-end">
          <DrawerTrigger asChild>
            <Button>
              {translate.formatMessage({ id: 'createGame' })}
            </Button>
          </DrawerTrigger>
        </div>
        <CreateGameDrawer />
      </Drawer>
      {games?.length > 0 && (
        <Stack>
          {games?.map(game => (
            <GamesItem key={game.id} game={game} />
          ))}
        </Stack>
      )}
    </Stack>
  );
};
