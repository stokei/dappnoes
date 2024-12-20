import { SITE_NAME } from '@/constants/site-info';
import { IS_DEVELOPMENT, WALLET_CONNECT_PROJECT_ID } from '@/environments';
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
      http: ['http://localhost:8545'],
    },
    public: {
      http: ['http://localhost:8545'],
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
} as Record<number, Transport>

const config = getDefaultConfig({
  appName: SITE_NAME,
  projectId: WALLET_CONNECT_PROJECT_ID,
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia, ...localChaings],
  ssr: true,
  transports,
});

export const walletsConfig = config;
