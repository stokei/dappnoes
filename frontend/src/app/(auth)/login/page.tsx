'use client';

import { useEffect } from 'react';

import { PageLayout } from '@/components/layouts';
import { NavBar } from '@/components/navbar';
import { useNavigate } from '@/hooks/use-navigate';
import { useUser } from '@/hooks/use-user';
import { routes } from '@/routes';

export default function Page() {
  const { isConnected } = useUser();
  const { push } = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      if (isConnected) {
        return push(routes.dashboard.home);
      }
    };
    checkAuth();
  }, [isConnected, push]);

  return (
    <PageLayout.Root>
      <PageLayout.Content>
        <NavBar />
      </PageLayout.Content>
    </PageLayout.Root>
  );
}
