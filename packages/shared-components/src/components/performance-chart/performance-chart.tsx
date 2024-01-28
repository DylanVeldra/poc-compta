import { useState, useEffect, useRef } from "react";

// Helpers
import { ChartGenerator } from "@shared-utils";
import datasetGenerator from "../../utils/chart-helper/dataset";
import options from "../../utils/chart-helper/options";
import { useLanguageDictionary } from "@shared-hooks";
import { BalanceEntry } from "@shared-types";
import { RoundLoader } from "@shared-components/loaders";
import { ToggleButtonGroup } from "@shared-components/toogle-button";
import { DropList, NewDropList } from "@shared-components/inputs";
import { DateTime } from "luxon";

interface PerformanceChartProps {
  performanceData: BalanceEntry[];
}

const PerformanceChart = (props: PerformanceChartProps) => {
  const dict = useLanguageDictionary();
  const [selected, setSelected] = useState("yearly");
  const canvasRef = useRef<any>();
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [scaleSelected, setScaleSelected] = useState<
    "3M" | "1Y" | "3Y" | "ALL"
  >("3M");
  const [curveSelected, setCurveSelected] = useState<
    "rawProfit" | "rawBalance" | "apr-apy"
  >("rawBalance");

  useEffect(() => {
    const canvas = canvasRef.current;
    let ctx;

    if (canvas) {
      ctx = canvas.getContext("2d");
    }

    for (let idx = props.performanceData.length - 1; idx > 0; idx--) {
      if (props.performanceData[idx].rawProfit !== 0) break;
      props.performanceData.splice(idx, 1);
    }
    const dataset = datasetGenerator(
      props.performanceData,
      curveSelected,
      scaleSelected
    );

    // Compute the lower bound of the chart
    if (dataset.labels.length === 0) {
      return;
    }

    const firstLabel = dataset.labels[0].toFormat("YYYY-MM-dd");
    let scale = firstLabel;
    let dateSelected: DateTime = dataset.labels[0];
    scale = firstLabel;

    if (scaleSelected === "3M") {
      dateSelected = DateTime.now().minus({ months: 3 });
    } else if (scaleSelected === "1Y") {
      dateSelected = DateTime.now().minus({ years: 1 });
    } else if (scaleSelected === "3Y") {
      dateSelected = DateTime.now().minus({ years: 3 });
    }

    // Always use the maximum of avaible space
    if (dateSelected < dataset.labels[0]) {
      dateSelected = dataset.labels[0];
    }

    scale = dateSelected.toFormat("yyyy-MM-dd");

    options.scales.x.min = scale;
    options.scales.x.suggestedMin = scale;

    const chart = new ChartGenerator(
      "line",
      dataset,
      options
    ).generatePerformanceMonthlyChart(ctx);
    setIsLoading(() => false);

    return () => {
      chart.destroy();
    };
  }, [
    canvasRef,
    selected,
    props.performanceData,
    isEmpty,
    curveSelected,
    scaleSelected,
  ]);

  useEffect(() => {
    if (
      selected === "monthly" &&
      props.performanceData[props.performanceData.length - 1]
    ) {
      setIsEmpty(!!props.performanceData.length);
    }
  }, [selected, setIsEmpty, props.performanceData, isLoading]);

  return (
    <div className="w-full bg-gradient-to-r from-gold p-[1px] rounded-sm h-auto shadow-light dark:shadow-dark">
      <div className="h-full flex flex-col items-between justify-between p-[21px] bg-white dark:bg-dark-gray rounded-sm relative">
        <div className="flex flex-col h-full">
          <div className="flex flex-col h-full">
            <div className="flex">
              <div>
                <h4 className="text-lg font-semibold">
                  {dict.performanceMonitoring.myPerformance}
                </h4>
              </div>
              <div className="flex-1" />
              <div>
                <div className="flex flex-col sm:flex-row sm:space-x-5 space-y-5 sm:space-y-0">
                  <div>
                    <ToggleButtonGroup
                      options={["3M", "1Y", "3Y", "ALL"]}
                      onChange={setScaleSelected as (value: string) => void}
                    />
                  </div>
                  <div>
                    <NewDropList
                      onChange={setCurveSelected as (value: string) => void}
                      items={[
                        {
                          value: "rawBalance",
                          label:
                            dict.performanceMonitoring.charts.curves.balance,
                        },
                        {
                          value: "rawProfit",
                          label: dict.performanceMonitoring.charts.curves.gains,
                        },
                        {
                          value: "apr-apy",
                          label:
                            dict.performanceMonitoring.charts.curves["apr-apy"],
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
            <h6 className="text-[16px] font-semibold text-gold">
              {dict.performanceMonitoring.chartCurves[curveSelected]}
            </h6>
            <div className="h-[390px] mt-[20px] flex items-center justify-center relative">
              {isLoading && (
                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-center h-[40px] w-[40px]">
                  <RoundLoader
                    width={20}
                    height={20}
                    color={"dark dark:border-gold"}
                  />
                </div>
              )}
              {isEmpty && !isLoading ? (
                <div className="text-center text-gold dark:text-gray">
                  {dict.performanceMonitoring.noData}
                </div>
              ) : (
                <>
                  <canvas ref={canvasRef}></canvas>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
