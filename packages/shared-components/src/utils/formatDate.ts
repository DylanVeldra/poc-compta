import { DateTime } from 'luxon';
import { useRouter } from 'next/router';

export enum DateFormats {
  SHORT,
  SEMI,
  FULL,
}

export function formatDate(date?: string, format = DateFormats.FULL) {
  const router = useRouter();
  const local = router.locale || 'en';
  if (!date) {
    return '';
  }
  if (format === DateFormats.SHORT) {
    return DateTime.fromISO(date)
      .setLocale(local)
      .toLocaleString(DateTime.DATE_SHORT);
  } else if (format === DateFormats.FULL) {
    return (
      DateTime.fromISO(date)
        .setLocale(local)
        .toLocaleString(DateTime.DATE_FULL) +
      ' ' +
      DateTime.fromISO(date)
        .setLocale(local)
        .toLocaleString(DateTime.TIME_SIMPLE)
    );
  } else {
    return DateTime.fromISO(date).setLocale(local).toFormat('dd/MM/yyyy hh:mm');
  }
}
