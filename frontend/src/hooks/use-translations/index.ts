import { useCallback } from 'react';
import { useIntl } from 'react-intl';

import { secondsToTime } from '@/utils/seconds-to-time';

import {
  FormatDate,
  FormatDateTime,
  FormatMessage,
  FormatMoney,
  FormatMoneyToNumber,
  FormatNumber,
  FormatTime,
  Translations,
} from './types';

export const useTranslations = (): Translations => {
  const intl = useIntl();

  const formatMessage: FormatMessage = useCallback(
    ({ id }, values) => {
      try {
        return intl.formatMessage({ id }, values);
      } catch {
        return '';
      }
    },
    [intl]
  );

  const formatMoney: FormatMoney = useCallback(
    ({ currency, amount, showSymbol = true }) => {
      try {
        const value = new Intl.NumberFormat(intl.locale, {
          style: 'decimal',
          minimumFractionDigits: 2,
          maximumFractionDigits: 18,
        }).format(amount);
        return `${value}${showSymbol ? ' '+currency : ''}`;
      } catch {
        return `0${showSymbol ? ' '+currency : ''}`;
      }
    },
    [intl]
  );

  const formatMoneyToNumber: FormatMoneyToNumber = useCallback((money) => {
    if (!money) {
      return 0;
    }
    const justNumbers = money?.trim()?.replace(/\D/g, '');
    return justNumbers ? parseFloat(justNumbers) : 0;
  }, []);

  const formatNumber: FormatNumber = useCallback(
    (value) => {
      if (!value) {
        return '0';
      }
      return intl.formatNumber(value, {
        unitDisplay: 'long',
      });
    },
    [intl]
  );

  const formatDateTime: FormatDateTime = useCallback(
    (time, options) => {
      try {
        if (typeof time === 'number') {
          if (time <= 0) {
            return '00:00';
          }
        }
        return intl.formatTime(time, options);
      } catch {
        return '';
      }
    },
    [intl]
  );

  const formatDate: FormatDate = useCallback(
    (date, options) => {
      if (!date) {
        return '';
      }
      try {
        const dateString = intl.formatDate(date, options);
        const timeString = options?.fullDate ? formatDateTime(date) : '';
        return `${dateString} ${timeString}`;
      } catch {
        return '';
      }
    },
    [intl, formatDateTime]
  );

  const formatTime: FormatTime = useCallback((seconds) => {
    try {
      return secondsToTime(seconds);
    } catch {
      return '';
    }
  }, []);

  return {
    locale: intl.locale,
    formatNumber,
    formatMessage,
    formatMoney,
    formatDate,
    formatTime,
    formatDateTime,
    formatMoneyToNumber,
  };
};
