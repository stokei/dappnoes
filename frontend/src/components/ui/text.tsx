import React, { PropsWithChildren } from 'react';

interface TextProps {
  size?: 'sm' | 'md' | 'lg';
}

const Text = ({ size = 'md', children }: PropsWithChildren<TextProps>) => {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <p className={`${sizes[size]}`}>
      {children}
    </p>
  );
};

export default Text;
