import { useEffect } from 'react';
import { watchContractEvent } from 'wagmi/actions';

import { walletsConfig } from '@/configs/wallets';
import { contractData } from '@/constants/contract-data';

import { useContract } from '../use-contract';
import { useToast } from '../use-toast';

interface UseContractMutation<TSuccessData = any> {
  eventName?: string;
  onSuccess?: (data: TSuccessData) => void
  onError?: (error: Error) => void
}
export const useWatchContractEvent = <TSuccessData = any>({
  eventName,
  onSuccess,
  onError
}: UseContractMutation<TSuccessData>) => {
  const { contract } = useContract();
  const { toast } = useToast();

  return useEffect(() => {
    if(!eventName){
      return;
    }
    watchContractEvent(walletsConfig, {
      address: contract,
      abi: contractData.abi,
      eventName,
      onLogs: (data) => {
        onSuccess?.((data?.[0] as any)?.args);
      },
      onError: (error) => {
        onError?.(error);
        toast({
          title: error?.message,
          variant: 'destructive',
        });
      },
    });
  }, [contract, eventName, onError, onSuccess, toast]);
};
