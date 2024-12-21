import { LANGUAGE } from '@/constants/language';
import { Messages } from '@/types/messages';

import { enUSMessages } from './en-us';
import { ptBRMessages } from './pt-br';

export const messages: Messages = {
  [LANGUAGE.EN_US]: enUSMessages,
  [LANGUAGE.PT_BR]: ptBRMessages,
};
