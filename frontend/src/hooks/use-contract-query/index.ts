import { useEffect } from 'react';
import { useReadContract } from 'wagmi';

import { contractData } from '@/constants/contract-data';
import { I18nKey } from '@/types/messages';
import { getErrorMessage } from '@/utils/get-error-message';

import { useContract } from '../use-contract';
import { useToast } from '../use-toast';
import { useTranslations } from '../use-translations';
import { useUser } from '../use-user';

interface UseContractQuery {
  functionName: string;
  enabled?: boolean;
  args?: any[];
}
export const useContractQuery = <TData = any>({
  enabled,
  functionName,
  args,
}: UseContractQuery) => {
  const { formatMessage } = useTranslations();
  const { accountAddress } = useUser();
  const { contract } = useContract();
  const { toast } = useToast();
  const isBool = enabled === true || enabled === false;
  const { data, error, isLoading } = useReadContract({
    query: {
      enabled: !!contract && !!accountAddress && (isBool ? enabled : true),
    },
    address: contract,
    abi: contractData.abi,
    functionName,
    account: accountAddress as any,
    args: args?.length ? args : [],
  });

  const errorMessage = error ? formatMessage({ id: getErrorMessage(error) as I18nKey }) : '';
  useEffect(() => {
    if(error){
      toast({
        title: errorMessage,
        variant: 'destructive'
      });
    }
  }, [error, errorMessage, toast]);

  return {
    errorMessage,
    data: data as TData,
    isLoading: !!isLoading
  };
};
