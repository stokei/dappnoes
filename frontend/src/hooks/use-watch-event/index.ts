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
    let isFinished = false;
    const clearEventListener = watchContractEvent(walletsConfig, {
      address: contract,
      abi: contractData.abi,
      eventName,
      syncConnectedChain: true,
      onLogs: (data) => {
        const args = (data?.[0] as any)?.args;
        onSuccess?.(args);
        isFinished = true;
      },
      onError: (error) => {
        onError?.(error);
        toast({
          title: error?.message,
          variant: 'destructive',
        });
        isFinished = true;
      },
    });
    return () => {
      if(isFinished){
        clearEventListener();
      }
    };
  }, [contract, eventName, onError, onSuccess, toast]);
};
