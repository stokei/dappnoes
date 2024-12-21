'use client';

import { PropsWithChildren, useEffect } from 'react';

import { useNavigate } from '@/hooks/use-navigate';
import { useUser } from '@/hooks/use-user';
import { routes } from '@/routes';

import { GlobalLoading } from '../global-loading';

export const PrivateRoute = ({ children }: PropsWithChildren) => {
  const { isConnected, isLoading } = useUser();
  const { push } = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      if(isLoading){
        return;
      }
      if (!isConnected) {
        return push(routes.auth.login);
      }
    };
    checkAuth();
  }, [isConnected, isLoading, push]);

  if(isLoading){
    return (
      <GlobalLoading />
    );
  }

  return <>{children}</>;
};
