import { MonthData } from "@shared-types";

export function generateMonthsArray(backwards: number, months: string[]): MonthData[] {
  const array: Array<MonthData> = [];
  let currMonth = new Date().getMonth();
  let currYear = new Date().getFullYear();

  for (let i = 0; i < backwards; i++) {
    array.unshift({
      year: currYear,
      month: months[currMonth],
      index: currMonth + 1,
    });

    if (currMonth === 0) {
      // Resetting the value to loop backwards on the previous year
      currMonth = 11;
      currYear = currYear - 1;
    } else {
      // Looping backwards
      currMonth--;
    }
  }
  return array;
}
