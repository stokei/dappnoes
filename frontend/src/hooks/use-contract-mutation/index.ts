import { useEffect, useState } from 'react';
import { useWriteContract } from 'wagmi';
import { watchContractEvent } from 'wagmi/actions';

import { walletsConfig } from '@/configs/wallets';
import { contractData } from '@/constants/contract-data';

import { useContract } from '../use-contract';
import { useToast } from '../use-toast';
import { useUser } from '../use-user';

interface UseContractMutation<TSuccessData = any> {
  functionName: string;
  successEvent?: string;
  onSuccess?: (data: TSuccessData) => void
}
export const useContractMutation = <TSuccessData = any>({
  functionName,
  successEvent,
  onSuccess
}: UseContractMutation<TSuccessData>) => {
  const [isLoading, setIsLoading] = useState(false);
  const { accountAddress } = useUser();
  const { contract } = useContract();
  const { toast } = useToast();

  useEffect(() => {
    watchContractEvent(walletsConfig, {
      address: contract,
      abi: contractData.abi,
      eventName: successEvent,
      onLogs: (data) => {
        onSuccess?.((data?.[0] as any)?.args);
        setIsLoading(false);
      },
      onError: (error) => {
        setIsLoading(false);
        toast({
          title: error?.message,
          variant: 'destructive',
        });
      },
    });
  }, [contract, onSuccess, successEvent, toast]);

  const { writeContractAsync } = useWriteContract({
    mutation: {
      onError: (error) => {
        setIsLoading(false);
        toast({
          title: error?.message,
          variant: 'destructive',
        });
      },
    },
  });

  const onSubmit = async (args: any[], value?: any) => {
    if(!contract){
      return;
    }
    setIsLoading(true);
    await writeContractAsync({
      account: accountAddress,
      address: contract,
      abi: contractData.abi,
      functionName,
      args,
      value
    });
  };

  return {
    onSubmit,
    isLoading
  };
};
