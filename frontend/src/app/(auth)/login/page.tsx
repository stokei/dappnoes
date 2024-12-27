'use client';

import { useEffect } from 'react';

import { Logo } from '@/components/logo';
import { BackgroundContainer } from '@/components/ui/background-container';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { WalletButton } from '@/components/wallet-button';
import { useNavigate } from '@/hooks/use-navigate';
import { useTranslations } from '@/hooks/use-translations';
import { useUser } from '@/hooks/use-user';
import { routes } from '@/routes';
import { getLastPathnameAuthenticated } from '@/utils/cookies/last-pathname-authenticated';

export default function Page() {
  const { isConnected } = useUser();
  const { push } = useNavigate();
  const translate = useTranslations();

  useEffect(() => {
    const checkAuth = () => {
      if (isConnected) {
        const lastPathnameAuthenticated = getLastPathnameAuthenticated();
        return push(lastPathnameAuthenticated || routes.dashboard.home);
      }
    };
    checkAuth();
  }, [isConnected, push]);

  return (
    <BackgroundContainer>
      <div className="w-full min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md bg-black/40 backdrop-blur-xl border-white/10">
          <CardHeader className="space-y-4 text-center items-center">
            <Logo />
            <CardDescription className="text-lg text-white/80">
              {translate.formatMessage({ id: 'loginGameSlogan' })}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-center text-white/70 italic">
              {translate.formatMessage({ id: 'loginInspirationalQuote' })}
            </p>
            <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center space-y-2">
              <WalletButton />
            </div>
          </CardContent>
          <CardFooter className="text-center text-white/40 text-sm">
            {translate.formatMessage({ id: 'loginFooterMessage' })}
          </CardFooter>
        </Card>
      </div>
    </BackgroundContainer>
  );
}
