'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Stack } from '@/components/ui/stack';
import Text from '@/components/ui/text';
import { useUser } from '@/hooks/use-user';

import { useCreateRoom } from '../_hooks/use-create-room';
import { useGetRooms } from '../_hooks/use-get-rooms';

export const RoomsList = () => {
  const { onCreateRoom } = useCreateRoom();
  const { rooms } = useGetRooms();
  const { accountAddress } = useUser();

  return (
    <Stack>
      <Button
        onClick={() => onCreateRoom({
          name: 'Sala do Douglas',
          owner: accountAddress || '',
          entryFee: 0,
          maxPlayers: 4
        })}
      >
        Criar
      </Button>

      {rooms?.length > 0 && (
        <Stack>
          {rooms?.map(room => (
            <Card key={room.id}>
              <CardHeader>
                <CardTitle>
                  {room.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  <Text>ID: {room.id}</Text>
                  <Text>Proprietário: {room.owner}</Text>
                  <Text>Taxa de Entrada: {room.entryFee}</Text>
                  <Text>Jogadores: {room.maxPlayers}</Text>
                  <Text>Status: {room.status}</Text>
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Stack>
  );
};
