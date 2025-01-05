import { useContext } from 'react';

import { WebSocketContext } from '@/contexts/websocket';

export const useWebSocket = () => useContext(WebSocketContext);
