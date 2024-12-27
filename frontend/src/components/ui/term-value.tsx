import { PropsWithChildren } from 'react';

import { Stack, StackProps } from './stack';
import { Text } from './text';

export const Term = ({ children, ...props }: PropsWithChildren<StackProps>) => {
  return (
    <Stack width="fit" direction="row" align="baseline" {...props}>
      {children}
    </Stack>
  );
};
export const TermLabel = ({ children }: PropsWithChildren) => {
  return (
    <Text fontWeight="bold">
      {children}:
    </Text>
  );
};
export const TermValue = ({ children }: PropsWithChildren) => {
  if(typeof children === 'string'){
    return (
      <Text>{children}</Text>
    );
  }
  return (
    <Stack width="fit" direction="column">
      {children}
    </Stack>
  );
};
