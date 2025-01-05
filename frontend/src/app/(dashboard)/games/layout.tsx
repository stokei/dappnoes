import { PropsWithChildren } from 'react';

import { NavBar } from '@/components/navbar';

export default function GamesLayout({
  children,
}: PropsWithChildren) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
