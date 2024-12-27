import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { defineChain } from 'viem';
import { http, Transport } from 'wagmi';

import { SITE_NAME } from '@/constants/site-info';
import { GANACHE_CONTRACT, GANACHE_URL, WALLET_CONNECT_PROJECT_ID } from '@/environments';

const customNetworkGanacheLocal = defineChain({
  id: 1337,
  name: 'Ganache Local',
  network: 'ganache',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [GANACHE_URL],
    },
    public: {
      http: [GANACHE_URL],
    },
  },
});

const transports = {
  [customNetworkGanacheLocal.id]: http(),
} as Record<number, Transport>;

const config = getDefaultConfig({
  appName: SITE_NAME,
  projectId: WALLET_CONNECT_PROJECT_ID,
  chains: [customNetworkGanacheLocal],
  ssr: true,
  transports,
});

export const walletsConfig = config;

export const contracts: Record<number, string> = {
  [customNetworkGanacheLocal.id]: GANACHE_CONTRACT,
};
