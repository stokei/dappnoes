'use client';

import { useContractMutation } from '@/hooks/use-contract-mutation';

export const useWithdrawGame = () => {
  const { onSubmit, isLoading } = useContractMutation({
    functionName: 'withdraw',
  });

  const onWithdrawGame = async () => {
    onSubmit([]);
  };

  return {
    onWithdrawGame,
    isLoading
  };
};
