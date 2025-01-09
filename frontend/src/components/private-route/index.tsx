'use client';

import { PropsWithChildren, useEffect } from 'react';

import { useNavigate } from '@/hooks/use-navigate';
import { useUser } from '@/hooks/use-user';
import { routes } from '@/routes';
import { getLastPathnameAuthenticated, setLastPathnameAuthenticated } from '@/utils/cookies/last-pathname-authenticated';

import { GlobalLoading } from '../global-loading';

interface PrivateRouteProps {
  isLoading?: boolean;
  whenIsConnectedAndAllowedThisRule?: boolean;
}

export const PrivateRoute = ({ isLoading: isLoadingProp, children, whenIsConnectedAndAllowedThisRule }: PropsWithChildren<PrivateRouteProps>) => {
  const { isConnected, isLoading: isLoadingUser } = useUser();
  const { push, pathname } = useNavigate();

  const isLoading = isLoadingUser || isLoadingProp;

  useEffect(() => {
    const checkAuth = () => {
      if(isLoading){
        return;
      }
      if (!isConnected) {
        return push(routes.auth.login({ redirectTo: getLastPathnameAuthenticated() }));
      }
      if(whenIsConnectedAndAllowedThisRule !== undefined && !whenIsConnectedAndAllowedThisRule){
        return push(routes.home);
      }
      setLastPathnameAuthenticated(pathname);
    };
    checkAuth();
  }, [isConnected, isLoading, pathname, push, whenIsConnectedAndAllowedThisRule]);

  if(isLoading){
    return (
      <GlobalLoading />
    );
  }

  return <>{children}</>;
};
