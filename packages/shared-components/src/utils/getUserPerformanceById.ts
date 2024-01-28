import { UserYearlyPerformanceByMonths, MonthData } from "@shared-types";
import { fetchJSON } from "@shared-utils";

export async function GetUserPerformancesById(time: "YEARLY" | "MONTHLY", previousMonthsData: MonthData[], onError: () => void, userId?: number) {
  const dataByMonths: UserYearlyPerformanceByMonths[] = [];

  if (time === "YEARLY") {
    return await fetchJSON(`/performances/user/id/${userId}/${previousMonthsData[previousMonthsData.length - 1].year}`)
      .then((json) => {
        return json.body;
      })
      .catch((err) => onError);
  }

  if (time === "MONTHLY") {
    await Promise.all(
      previousMonthsData.map(async (element) => {
        await fetchJSON(`/performances/user/id/${userId}/${element.year}/${element.index}`)
          .then((json) => {
            json.body.year = +element.year;
            json.body.month = element.month;
            json.body.index = +element.index;
            dataByMonths.push(json.body);
          })
          .catch((err) => onError);
      })
    );

    return dataByMonths.sort((a, b) => {
      return a.year > b.year ? 1 : a.index > b.index ? 1 : -1;
    });
  }
}
