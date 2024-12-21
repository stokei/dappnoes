'use client';

import { PropsWithChildren } from 'react';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';

import { walletsConfig } from '@/configs/wallets';
import { TranslationsProvider } from '@/contexts/translations';
import { WebsocketProvider } from '@/contexts/websocket';

import { ApiClientProvider } from '../contexts/api-client';

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <WagmiProvider reconnectOnMount config={walletsConfig}>
      <ApiClientProvider>
        <RainbowKitProvider>
          <TranslationsProvider>
            <WebsocketProvider>
              {children}
            </WebsocketProvider>
          </TranslationsProvider>
        </RainbowKitProvider>
      </ApiClientProvider>
    </WagmiProvider>
  );
};
