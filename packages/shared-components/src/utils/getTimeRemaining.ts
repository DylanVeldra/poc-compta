import { DateTime } from "luxon";
import { useRouter } from "next/router";

export const getTimeRemaining = (date: string, days: number) => {
  const router = useRouter();
  const local = router.locale || "en";

  const current = DateTime.local();
  const end = DateTime.fromISO(date).plus({ days });
  const diff = end.diff(current);
  if (diff.as("days") < 1) {
    return {
      type: local === "en" ? "hour(s)" : "heure(s)",
      time: diff.as("hours").toFixed(0),
    };
  }
  return {
    type: local === "en" ? "day(s)" : "jour(s)",
    time: diff.as("days").toFixed(0),
  };
};
