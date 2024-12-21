import { PropsWithChildren } from 'react';

interface ContainerProps {
  direction?: 'column' | 'row';
}
export const Container = ({ direction = 'column', children }: PropsWithChildren<ContainerProps>) => {
  const directionClasses = {
    'column': 'flex-col',
    'row': 'flex-row',
  };
  return <div className={`w-full px-4 flex ${directionClasses?.[direction]}`}>{children}</div>;
};
