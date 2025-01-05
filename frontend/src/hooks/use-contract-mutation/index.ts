import { useState } from 'react';
import { useWriteContract } from 'wagmi';

import { contractData } from '@/constants/contract-data';
import { I18nKey } from '@/types/messages';
import { getErrorMessage } from '@/utils/get-error-message';

import { useContract } from '../use-contract';
import { useToast } from '../use-toast';
import { useTranslations } from '../use-translations';
import { useUser } from '../use-user';
import { useWatchContractEvent } from '../use-watch-event';

interface UseContractMutation<TSuccessData = any> {
  functionName: string;
  successEvent?: string;
  onSuccess?: (data?: TSuccessData) => void
}
export const useContractMutation = <TSuccessData = any>({
  functionName,
  successEvent,
  onSuccess
}: UseContractMutation<TSuccessData>) => {
  const [isLoading, setIsLoading] = useState(false);
  const { formatMessage } = useTranslations();
  const { accountAddress } = useUser();
  const { contract } = useContract();
  const { toast } = useToast();

  useWatchContractEvent({
    eventName: successEvent,
    onSuccess: (data) => {
      onSuccess?.(data);
      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  const { writeContractAsync } = useWriteContract({
    mutation: {
      onSuccess: () => {
        if(!successEvent){
          onSuccess?.();
        }
      },
      onError: (error) => {
        setIsLoading(false);
        toast({
          title: formatMessage({ id: getErrorMessage(error) as I18nKey }),
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
      account: accountAddress as `0x${string}`,
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
