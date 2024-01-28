import { useEffect, useRef, useState } from "react";
import { PerformanceChart } from "@shared-components/performance-chart";
import { PerformanceMonitoringBox } from "@shared-components/performance-monitoring-box";
import { useLanguageDictionary } from "@shared-hooks";
import {
  fetchJSON,
  getPerformancePeriod,
  getPerformancesApy,
  getPerformancesProfits,
} from "@shared-utils";
import { ToastGenerator } from "@shared-components/toast-generator";
import { BalanceEntry } from "@shared-types";
import { ProfitsTable } from "@shared-components/profits-table";
import { DateTime } from "luxon";

interface PerformanceSummary {
  showProfitTable: boolean;
}

export default function PerformanceSummary(props: PerformanceSummary) {
  const dict = useLanguageDictionary();
  const toastRef = useRef<any>();
  const [performanceData, setPerformanceData] = useState<BalanceEntry[]>([]);

  const [performanceBox, setPerformanceBox] = useState({
    month: {
      value: 0,
      apy: 0,
      previousApy: 0,
    },
    year: {
      value: 0,
      apy: 0,
      previousApy: 0,
    },
  });

  useEffect(() => {
    fetchJSON(`/balance/all`, "GET").then((data) => {
      setPerformanceData(data.body);

      const previousYear = getPerformancePeriod(
        data.body,
        DateTime.fromMillis(0),
        DateTime.now().minus({ year: 1 }).endOf("year")
      );
      const actualYear = getPerformancePeriod(
        data.body,
        DateTime.now().startOf("year"),
        DateTime.now()
      );
      const previousMonth = getPerformancePeriod(
        data.body,
        DateTime.fromMillis(0),
        DateTime.now().minus({ month: 1 }).endOf("month")
      );
      const actualMonth = getPerformancePeriod(
        data.body,
        DateTime.now().startOf("month"),
        DateTime.now()
      );

      const performanceBoxData = {
        year: {
          value: getPerformancesProfits(actualYear),
          apy: 0,
          previousApy: getPerformancesApy(previousYear),
        },
        month: {
          value: getPerformancesProfits(actualMonth),
          apy: 0,
          previousApy: getPerformancesApy(previousMonth),
        },
      };
      performanceBoxData.year.apy = getPerformancesApy(
        actualYear,
        performanceBoxData.year.previousApy
      );
      performanceBoxData.month.apy = getPerformancesApy(
        actualMonth,
        performanceBoxData.month.previousApy
      );

      setPerformanceBox(performanceBoxData);
    });
  }, []);

  return (
    <>
      <ToastGenerator ref={toastRef} />
      <div className="flex flex-col lg:flex-row mt-[30px] md:mt-[60px] lg:space-x-[30px] mb-[80px]">
        <div className="flex flex-col md:flex-row lg:flex-col min-w-[260px] md:space-x-10 lg:space-x-0">
          <div className="lg:mb-[20px] flex-none md:flex-1 lg:flex-none">
            <PerformanceMonitoringBox
              title={dict.performanceMonitoring.onGoingMonth}
              subtitle={dict.performanceMonitoring.profit}
              amount={performanceBox.month.value}
              apy={performanceBox.month.apy}
              previousApy={performanceBox.month.previousApy}
            />
          </div>
          <div className="flex-none md:flex-1 lg:flex-none">
            <PerformanceMonitoringBox
              title={dict.performanceMonitoring.onGoingYear}
              subtitle={dict.performanceMonitoring.profit}
              amount={performanceBox.year.value}
              apy={performanceBox.year.apy}
              previousApy={performanceBox.year.previousApy}
            />
          </div>
        </div>
        <PerformanceChart performanceData={performanceData} />
      </div>
      {props.showProfitTable ? (
        <ProfitsTable performanceData={performanceData} />
      ) : (
        <></>
      )}
    </>
  );
}
