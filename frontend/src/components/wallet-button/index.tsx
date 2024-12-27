'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

import { useTranslations } from '@/hooks/use-translations';

import { Button } from '../ui/button';

export const WalletButton = () => {
  const { formatMessage } = useTranslations();

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        return (
          <div
            {...(!mounted && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <Button
                    width="full"
                    onClick={openConnectModal}
                  >
                    {formatMessage({ id: 'connectWallet' })}
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    width="full"
                    variant="error"
                    onClick={openChainModal}
                  >
                    {formatMessage({ id: 'wrongNetwork' })}
                  </Button>
                );
              }

              return (
                <div className="flex gap-3">
                  <Button
                    onClick={openChainModal}
                  >
                    {chain.hasIcon && (
                      <div className="w-6 h-6 rounded-full overflow-hidden">
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            className="w-full h-full"
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </Button>

                  <Button
                    onClick={openAccountModal}
                  >
                    {account.displayName}
                    {account.displayBalance ? ` (${account.displayBalance})` : ''}
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
