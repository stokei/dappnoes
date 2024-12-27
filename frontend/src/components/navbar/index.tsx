'use client';

import Link from 'next/link';

import { Container } from '@/components/ui/container';
import { useDevice } from '@/hooks/use-device';
import { routes } from '@/routes';

import { Logo } from '../logo';
import { WalletButton } from '../wallet-button';

export const NavBar = () => {
  const { isMobile } = useDevice();
  return (
    <nav className="w-full h-fit py-4 bg-translucent mb-5">
      <Container>
        <div className={`w-full flex items-center ${isMobile ? 'justify-end' : 'justify-between'}`}>
          {!isMobile && (
            <Link href={routes.home} className="flex gap-1 text-white">
              <Logo />
            </Link>
          )}
          <WalletButton />
        </div>
      </Container>
    </nav>
  );
};
