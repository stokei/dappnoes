import { PropsWithChildren } from 'react';

export const PageLayout = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-row">{children}</div>;
};
