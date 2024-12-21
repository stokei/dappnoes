import { useChainId } from 'wagmi';

import { contracts } from '@/configs/wallets';

export const useContract = () => {
  const chainId = useChainId();
  const contract = chainId ? contracts[chainId] : undefined;

  return {
    contract
  };
};
