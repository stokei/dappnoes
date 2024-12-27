'use client';

import { PropsWithChildren, useEffect } from 'react';

import { useNavigate } from '@/hooks/use-navigate';
import { useUser } from '@/hooks/use-user';
import { routes } from '@/routes';
import { getLastPathnameAuthenticated, setLastPathnameAuthenticated } from '@/utils/cookies/last-pathname-authenticated';

import { GlobalLoading } from '../global-loading';

export const PrivateRoute = ({ children }: PropsWithChildren) => {
  const { isConnected, isLoading } = useUser();
  const { push, pathname } = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      if(isLoading){
        return;
      }
      if (!isConnected) {
        return push(routes.auth.login({ redirectTo: getLastPathnameAuthenticated() }));
      }
      setLastPathnameAuthenticated(pathname);
    };
    checkAuth();
  }, [isConnected, isLoading, pathname, push]);

  if(isLoading){
    return (
      <GlobalLoading />
    );
  }

  return <>{children}</>;
};
