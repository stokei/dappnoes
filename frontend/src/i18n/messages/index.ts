import { Messages } from '@/types/messages';
import { enUSMessages } from './en-us';
import { ptBRMessages } from './pt-br';
import { LANGUAGE } from '@/constants/language';

export const messages: Messages = {
  [LANGUAGE.EN_US]: enUSMessages,
  [LANGUAGE.PT_BR]: ptBRMessages,
};
