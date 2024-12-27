import React, { PropsWithChildren } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const titleVariants = cva(
  'font-bold',
  {
    variants: {
      size: {
        sm: 'text-lg',
        md: 'text-xl',
        lg: 'text-2xl',
        xl: 'text-4xl',
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  }
);

interface TitleProps extends VariantProps<typeof titleVariants> {}

export const Title = ({ size, children }: PropsWithChildren<TitleProps>) => {
  return (
    <h1
      className={cn(titleVariants({ size }))}
    >
      {children}
    </h1>
  );
};
