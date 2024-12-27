'use client';

import { GlobalLoading } from '@/components/global-loading';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';
import { Stack } from '@/components/ui/stack';
import { useTranslations } from '@/hooks/use-translations';

import { useGetGames } from '../_hooks/use-get-games';

import { CreateGameDrawer } from './create-game-drawer';
import { GamesItem } from './games-item';

export const GamesList = () => {
  const translate = useTranslations();
  const { games, isLoading } = useGetGames();

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
      {isLoading ? (
        <GlobalLoading />
      ) : (
        <>
          {games?.length > 0 && (
            <Stack>
              {games?.map(game => (
                <GamesItem key={game.id} game={game} />
              ))}
            </Stack>
          )}
        </>
      )}
    </Stack>
  );
};
