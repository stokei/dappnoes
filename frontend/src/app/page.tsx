'use client';

import { useEffect } from 'react';

import { GlobalLoading } from '@/components/global-loading';
import { useNavigate } from '@/hooks/use-navigate';
import { useUser } from '@/hooks/use-user';
import { routes } from '@/routes';
import { getLastPathnameAuthenticated } from '@/utils/cookies/last-pathname-authenticated';

export default function Page() {
  const { isConnected, isLoading } = useUser();
  const { push } = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      if(isLoading){
        return;
      }
      if (isConnected) {
        return push(routes.dashboard.home);
      }
      return push(routes.auth.login({ redirectTo: getLastPathnameAuthenticated() }));
    };
    checkAuth();
  }, [isConnected, isLoading, push]);

  return (
    <GlobalLoading />
  );
}
