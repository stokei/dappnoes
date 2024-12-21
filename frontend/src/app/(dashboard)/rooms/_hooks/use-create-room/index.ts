'use client';

import { useWebsocket } from '@/hooks/use-websocket';
import { WebSocketMessages } from '@/services/api/constants/websocket-messages';
import { CreateRoomData,Room } from '@/services/api/types/room';

export const useCreateRoom = () => {
  const { socketConnection } = useWebsocket();

  const onCreateRoom = (data: CreateRoomData) => {
    socketConnection?.emit(WebSocketMessages.CREATE_ROOM, data, (value: Room) => {
      console.log(value);
    });
  };

  return {
    onCreateRoom
  };
};
