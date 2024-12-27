import { PropsWithChildren } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { useTranslations } from '@/hooks/use-translations';
import { cn } from '@/lib/utils';

import { Stack } from './stack';

const priceAmountVariants = cva(
  'font-medium',
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      size: 'md'
    },
  }
);

interface PriceProps extends VariantProps<typeof priceAmountVariants> {
  amount: number;
}

export const Price = ({ size, amount }: PropsWithChildren<PriceProps>) => {
  const translate = useTranslations();
  return (
    <Stack width="fit" direction="row">
      <p
        className={cn(priceAmountVariants({ size }))}
      >
        {translate.formatMoney({
          amount,
          currency: 'ETH',
        })}
      </p>
    </Stack>
  );
};
