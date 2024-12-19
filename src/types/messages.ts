import { LANGUAGE } from '@/constants/language';
import { ptBRMessages } from '@/i18n/messages/pt-br';

export type LanguageMessages = typeof ptBRMessages;
export type I18nKey = keyof LanguageMessages;
export type Messages = Record<LANGUAGE, LanguageMessages>;
