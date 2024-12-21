import { PropsWithChildren } from 'react';
import { IntlProvider } from 'react-intl';

import { defaultLanguage, LANGUAGE } from '@/constants/language';
import { useUser } from '@/hooks/use-user';
import { messages } from '@/i18n/messages';

export { IntlProvider } from 'react-intl';

export interface TranslationsProviderProps {
  readonly language?: LANGUAGE;
}

export const TranslationsProvider = ({
  language,
  children,
}: PropsWithChildren<TranslationsProviderProps>) => {
  const {  } = useUser();
  return (
    <IntlProvider locale={language || defaultLanguage} messages={messages[language || defaultLanguage]}>
      <>{children}</>
    </IntlProvider>
  );
};
