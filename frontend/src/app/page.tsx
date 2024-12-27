'use client';

import { useEffect } from 'react';

import { GlobalLoading } from '@/components/global-loading';
import { useNavigate } from '@/hooks/use-navigate';
import { useUser } from '@/hooks/use-user';
import { routes } from '@/routes';
import { getLastPathnameAuthenticated } from '@/utils/cookies/last-pathname-authenticated';

export default function Page() {
  const { isConnected } = useUser();
  const { push } = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      if (isConnected) {
        return push(routes.dashboard.home);
      }
      return push(routes.auth.login({ redirectTo: getLastPathnameAuthenticated() }));
    };
    checkAuth();
  }, [isConnected, push]);

  return (
    <GlobalLoading />
  );
}
