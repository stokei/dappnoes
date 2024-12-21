'use client';

import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { WEBSOCKET_API_URL } from '@/environments';

interface WebsocketContextValues {
  socketConnection: Socket | undefined;
  isConnectedSocket: boolean;
}

export const WebsocketContext = createContext({} as WebsocketContextValues);

export const WebsocketProvider = ({ children }: PropsWithChildren) => {
  const [isConnectedSocket, setIsConnectedSocket] = useState(false);
  const [socketConnection, setSocketConnection] = useState<Socket | undefined>();

  useEffect(() => {
    const socketInstance = io(WEBSOCKET_API_URL);
    setSocketConnection(socketInstance);
    socketInstance.on('connect', () => {
      setIsConnectedSocket(true);
    });
    socketInstance.on('disconnect', () => {
      setIsConnectedSocket(false);
    });
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const value = {
    socketConnection,
    isConnectedSocket
  };
  return (
    <WebsocketContext
      value={value}
    >
      {children}
    </WebsocketContext>
  );
};
