import { DateTime } from "luxon";

export const lessThanOneMonthAgo = (date: string) => {
  const convertedDate = DateTime.fromISO(date);
  const diff = DateTime.now().diff(convertedDate, ["days", "hours"]).toObject();
  return diff.days! < 30;
};
