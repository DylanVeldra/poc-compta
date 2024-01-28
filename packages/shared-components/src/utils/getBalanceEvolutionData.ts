import { MonthData } from "@shared-types";
import { fetchJSON } from "@shared-utils";

export async function getBalanceEvolutionData(
  previousMonthsData: MonthData[],
  onReject: () => void
  ) {
  const data: any[] = [];

  await Promise.all(
    previousMonthsData.map(async (element) => {
      await fetchJSON(
        `/balance/evolution/${element.year}/${element.index}`
      )
        .then((json) => {
          data.push([...json.body]);
        })
        .catch(() => onReject);
    })
  );

  return data.sort((a, b) => {
    return new Date(a[0].date).getTime() > new Date(b[0].date).getTime()
      ? 1
      : -1;
  });
}
