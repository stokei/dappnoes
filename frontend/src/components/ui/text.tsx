import React, { PropsWithChildren } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const textVariants = cva(
  'font-medium break-all text-wrap',
  {
    variants: {
      width: {
        fit: 'w-fit',
        full: 'w-full'
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
      fontWeight: {
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
    },
    defaultVariants: {
      width: 'fit',
      size: 'md',
      fontWeight: 'medium'
    },
  }
);

interface TextProps extends VariantProps<typeof textVariants> {}

export const Text = ({ size, fontWeight, width, children }: PropsWithChildren<TextProps>) => {
  return (
    <p
      className={cn(textVariants({ width, size, fontWeight }))}
    >
      {children}
    </p>
  );
};
