import { I18nKey } from '@/types/messages';

export interface FormatNumber {
  (value: number): string | undefined;
}

export interface FormatMessage {
  ({ id }: { id: I18nKey }, values?: Record<string, string | number>): string;
}

export interface FormatMoney {
  ({
    amount,
  }: {
    amount: bigint;
  }): string;
}

export interface FormatDate {
  (
    date: Parameters<Intl.DateTimeFormat['format']>[0] | string,
    options?: Intl.DateTimeFormatOptions & {
      format?: string;
      fullDate?: boolean;
    }
  ): string | undefined;
}

export interface FormatTime {
  (seconds: number): string | undefined;
}

export interface FormatDateTime {
  (
    time: Parameters<Intl.DateTimeFormat['format']>[0] | string,
    options?: Intl.DateTimeFormatOptions & { format?: string }
  ): string | undefined;
}

export interface FormatMoneyToNumber {
  (money: string): number;
}

export interface Translations {
  locale: string;
  formatNumber: FormatNumber;
  formatMessage: FormatMessage;
  formatMoney: FormatMoney;
  formatDate: FormatDate;
  formatTime: FormatTime;
  formatDateTime: FormatDateTime;
  formatMoneyToNumber: FormatMoneyToNumber;
}
