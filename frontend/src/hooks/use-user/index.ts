import { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

export const useUser = () => {
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [alreadyStartLoading, setAlreadyStartLoading] = useState(false);
  const { address: accountAddress, isConnecting: isLoading } = useAccount();

  useEffect(() => {
    if(isLoading || accountAddress){
      setAlreadyStartLoading(true);
    }
  }, [accountAddress, isLoading]);

  const onConnect = async () => {
    try {
      connect({ connector: injected() });
    } catch {}
  };

  const onDisconnect = () => {
    try {
      disconnect();
    } catch {}
  };

  return {
    isLoading: !alreadyStartLoading || isLoading,
    isConnected: !!accountAddress,
    accountAddress: accountAddress as string,
    onConnect,
    onDisconnect
  };
};
