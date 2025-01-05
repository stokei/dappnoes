import { PropsWithChildren } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { useTranslations } from '@/hooks/use-translations';
import { cn } from '@/lib/utils';

import { Stack } from './stack';

const priceCurrencyVariants = cva(
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
const priceAmountVariants = cva(
  'font-bold text-purple-600',
  {
    variants: {
      size: {
        sm: 'text-lg',
        md: 'text-2xl',
        lg: 'text-3xl',
      },
    },
    defaultVariants: {
      size: 'md'
    },
  }
);

interface PriceProps extends VariantProps<typeof priceAmountVariants> {
  amount: bigint;
}

export const Price = ({ size, amount }: PropsWithChildren<PriceProps>) => {
  const translate = useTranslations();
  return (
    <Stack width="fit" direction="row" align="center">
      <p
        className={cn(priceCurrencyVariants({ size }))}
      >
        ETH
      </p>
      <p
        className={cn(priceAmountVariants({ size }))}
      >
        {translate.formatMoney({
          amount,
        })}
      </p>
    </Stack>
  );
};
