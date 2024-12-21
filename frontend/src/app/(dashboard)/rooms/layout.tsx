import { PropsWithChildren } from 'react';

import { NavBar } from '@/components/navbar';
import { Container } from '@/components/ui/container';

export default function RoomsLayout({
  children,
}: PropsWithChildren) {
  return (
    <>
      <NavBar />
      <Container direction="column">
        {children}
      </Container>
    </>
  );
}
