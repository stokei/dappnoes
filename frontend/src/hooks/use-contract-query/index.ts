import { useEffect } from 'react';
import { useReadContract } from 'wagmi';

import { contractData } from '@/constants/contract-data';

import { useContract } from '../use-contract';
import { useToast } from '../use-toast';

interface UseContractQuery {
  functionName: string;
  args?: any[];
}
export const useContractQuery = <TData = any>({
  functionName,
  args,
}: UseContractQuery) => {
  const { contract } = useContract();
  const { toast } = useToast();
  const { data, error, isLoading } = useReadContract({
    query: {
      enabled: !!contract,
    },
    address: contract,
    abi: contractData.abi,
    functionName,
    args: args?.length ? args : [],
  });

  useEffect(() => {
    if(error){
      console.log(error);
      toast({
        title: error?.shortMessage,
        variant: 'destructive'
      });
    }
  }, [error, toast]);

  return {
    data: data as TData,
    isLoading: !!isLoading
  };
};
