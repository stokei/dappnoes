import { useContext } from 'react';

import { WebsocketContext } from '@/contexts/websocket';

export const useWebsocket = () => useContext(WebsocketContext);
