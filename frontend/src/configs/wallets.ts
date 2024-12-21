import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { defineChain } from 'viem';
import { http, Transport } from 'wagmi';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia
} from 'wagmi/chains';

import { SITE_NAME } from '@/constants/site-info';
import { GANACHE_URL, IS_DEVELOPMENT, WALLET_CONNECT_PROJECT_ID } from '@/environments';

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

const localChaings = IS_DEVELOPMENT ? [customNetworkGanacheLocal] : [];
const transports = {
  [mainnet.id]: http(),
  [sepolia.id]: http(),
  ...(IS_DEVELOPMENT && {
    [customNetworkGanacheLocal.id]: http(),
  })
} as Record<number, Transport>;

const config = getDefaultConfig({
  appName: SITE_NAME,
  projectId: WALLET_CONNECT_PROJECT_ID,
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia, ...localChaings],
  ssr: true,
  transports,
});

export const walletsConfig = config;

export const contracts: Record<number, string> = {
  [mainnet.id]: '0xEthereumMainnetContractAddress',
  [polygon.id]: '0xPolygonContractAddress',
  [optimism.id]: '0xOptimismContractAddress',
  [arbitrum.id]: '0xArbitrumContractAddress',
  [base.id]: '0xBaseContractAddress',
  [sepolia.id]: '0xSepoliaContractAddress',
  [customNetworkGanacheLocal.id]: '0xGanacheLocalContractAddress',
};
