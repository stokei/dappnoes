import React, { PropsWithChildren } from 'react';

interface TitleProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Title = ({ size = 'lg', children }: PropsWithChildren<TitleProps>) => {
  const sizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl',
  };

  return (
    <h1 className={`${sizes[size]} font-bold`}>
      {children}
    </h1>
  );
};

export default Title;
