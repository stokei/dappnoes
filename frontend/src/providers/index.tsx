"use client";

import { walletsConfig } from '@/configs/wallets';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { PropsWithChildren } from "react";
import { WagmiProvider } from 'wagmi';
import { ApiClientProvider } from '../contexts/api-client';
import { TranslationsProvider } from '@/contexts/translations';

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <WagmiProvider reconnectOnMount config={walletsConfig}>
      <ApiClientProvider>
        <RainbowKitProvider>
          <TranslationsProvider>
            {children}
          </TranslationsProvider>
        </RainbowKitProvider>
      </ApiClientProvider>
    </WagmiProvider>
  );
}
