import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from 'wagmi/connectors';

export const useUser = () => {
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const { address: accountAddress, isConnected, isConnecting } = useAccount()

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
