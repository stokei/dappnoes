import { PropsWithChildren } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const stackVariants = cva(
  'flex gap-2',
  {
    variants: {
      width: {
        fit: 'w-fit',
        full: 'w-full'
      },
      direction: {
        column: 'flex-col',
        row: 'flex-row',
      },
      align: {
        baseline: 'items-baseline',
        start: 'items-start',
        end: 'items-end',
        center: 'items-center',
      },
      justify: {
        between: 'justify-between',
        start: 'justify-start',
        end: 'justify-end',
        center: 'justify-center',
      },
    },
    defaultVariants: {
      width: 'full',
      direction: 'column',
      align: 'start',
      justify: 'start'
    },
  }
);

export interface StackProps extends VariantProps<typeof stackVariants> {
  className?: string;
}

export const Stack = ({ children, className, ...props }: PropsWithChildren<StackProps>) => {
  return <div className={cn(stackVariants(props), className)}>{children}</div>;
};
