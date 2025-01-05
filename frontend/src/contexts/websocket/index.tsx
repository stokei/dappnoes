'use client';

import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { WEBSOCKET_API_URL } from '@/environments';

interface WebSocketContextValues {
  socketConnection: Socket | undefined;
  isConnectedSocket: boolean;
  emitEvent: <TPayload = any>(eventName: string, eventPayload: TPayload) => void
  onEvent: <TData = any>(eventName: string, callback: (data: TData) => void) => void
  offEvent: <TData = any>(eventName: string, callback: (data: TData) => void) => void
}

export const WebSocketContext = createContext({} as WebSocketContextValues);

export const WebSocketProvider = ({ children }: PropsWithChildren) => {
  const [isConnectedSocket, setIsConnectedSocket] = useState(false);
  const [socketConnection, setSocketConnection] = useState<Socket | undefined>();

  useEffect(() => {
    const socketInstance = io(WEBSOCKET_API_URL, {
      transports: ['websocket'],
    });
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

  const emitEvent: WebSocketContextValues['emitEvent'] = (eventName, eventPayload) => {
    if(!socketConnection){
      return;
    }
    socketConnection.emit(eventName, eventPayload);
  };
  const onEvent: WebSocketContextValues['emitEvent'] = (eventName, callback) => {
    if(!socketConnection){
      return;
    }
    socketConnection.on(eventName, callback as any);
  };
  const offEvent: WebSocketContextValues['emitEvent'] = (eventName, callback) => {
    if(!socketConnection){
      return;
    }
    socketConnection.off(eventName, callback as any);
  };

  const value = {
    socketConnection,
    isConnectedSocket,
    emitEvent,
    onEvent,
    offEvent
  };
  return (
    <WebSocketContext
      value={value}
    >
      {children}
    </WebSocketContext>
  );
};
