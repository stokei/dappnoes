'use client';

import { useEffect, useState } from 'react';

import { useWebsocket } from '@/hooks/use-websocket';
import { WebSocketMessages } from '@/services/api/constants/websocket-messages';
import { Room } from '@/services/api/types/room';

export const useGetRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const { socketConnection } = useWebsocket();

  useEffect(() => {
    socketConnection?.on(WebSocketMessages.ROOM_CREATED, (newRoom: Room) => {
      if(newRoom?.id){
        setRooms(currentRooms => {
          const existsRoom = currentRooms?.some(room => room.id === newRoom.id);
          if(existsRoom){
            return currentRooms;
          }
          return [newRoom, ...currentRooms];
        });
      }
    });
  }, [socketConnection]);

  return {
    rooms
  };
};
