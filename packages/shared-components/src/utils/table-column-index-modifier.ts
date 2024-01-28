import { DateTime } from 'luxon';

export function tableColumnIndexModifier(size: number) {
  if (size < 640) {
    return { start: 11, end: 12 };
  }

  if (size > 1800) {
    return { start: 4, end: 12 };
  }

  if (size > 1535) {
    return { start: 5, end: 12 };
  }

  if (size > 1279) {
    return { start: 6, end: 12 };
  }

  if (size > 1130) {
    return { start: 7, end: 12 };
  }

  if (size > 1023) {
    return { start: 8, end: 12 };
  }

  if (size > 767) {
    return { start: 8, end: 12 };
  }

  if (size > 639) {
    return { start: 9, end: 12 };
  }
}

export function getStartMonth(size: number, endDate: DateTime): DateTime {
  let diff = 8;
  if (size > 1800) {
    diff = 8;
  } else if (size > 1535) {
    diff = 7;
  } else if (size > 1279) {
    diff = 6;
  } else if (size > 1130) {
    diff = 5;
  } else if (size > 1023) {
    diff = 4;
  } else if (size > 767) {
    diff = 4;
  } else if (size > 639) {
    diff = 3;
  } else {
    diff = 1;
  }
  return endDate.minus({ months: diff - 1 }).startOf('month');
}
