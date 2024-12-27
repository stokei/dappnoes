import { PropsWithChildren } from 'react';

export const PageLayoutContent = ({ children }: PropsWithChildren) => {
  return <main className="w-full flex flex-1 flex-col">{children}</main>;
};
