import { WALLET_CONNECT_PROJECT_ID } from '@/environments';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
//import { http, createConfig } from 'wagmi'
import {
  mainnet,
  sepolia,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';

const config = getDefaultConfig({
  appName: 'DappCommerce',
  projectId: WALLET_CONNECT_PROJECT_ID,
  chains: [mainnet, polygon, optimism, sepolia, arbitrum, base],
  ssr: true,
});

export const walletsConfig = config;
/*
export const walletsConfig = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
*/
