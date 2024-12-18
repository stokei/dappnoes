import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from 'wagmi/connectors';

export const useWallet = () => {
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const { address: accountAddress, isConnected: connected, isConnecting } = useAccount()
  const isConnected = !isConnecting && !!connected && !!accountAddress;

  const onConnect = async () => {
    try {
      connect({ connector: injected() })
    } catch {}
  };

  const onDisconnect = () => {
    try {
      disconnect()
    } catch {}
  };

  return {
    isLoading: isConnecting,
    isConnected,
    accountAddress,
    onConnect,
    onDisconnect
  }
}
