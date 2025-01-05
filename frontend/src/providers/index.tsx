'use client';

import { PropsWithChildren } from 'react';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';

import { walletsConfig } from '@/configs/wallets';
import { TranslationsProvider } from '@/contexts/translations';
import { WebSocketProvider } from '@/contexts/websocket';

import { ApiClientProvider } from '../contexts/api-client';

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <WagmiProvider reconnectOnMount config={walletsConfig}>
      <ApiClientProvider>
        <RainbowKitProvider>
          <TranslationsProvider>
            <WebSocketProvider>
              {children}
            </WebSocketProvider>
          </TranslationsProvider>
        </RainbowKitProvider>
      </ApiClientProvider>
    </WagmiProvider>
  );
};
