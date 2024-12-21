import { PropsWithChildren } from 'react';

interface StackProps {
  direction?: 'column' | 'row';
}
export const Stack = ({ direction = 'column', children }: PropsWithChildren<StackProps>) => {
  const directionClasses = {
    'column': 'flex-col',
    'row': 'flex-row',
  };
  return <div className={`w-full flex gap-2 ${directionClasses?.[direction]}`}>{children}</div>;
};
