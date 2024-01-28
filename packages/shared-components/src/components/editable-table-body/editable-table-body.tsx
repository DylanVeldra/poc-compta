import { useState, useEffect, FocusEvent, useRef } from "react";
import { fetchJSON } from "@shared-utils";
import { GradientBorder } from "@shared-components/gradient-border";
import { useLanguageDictionary } from "@shared-hooks";
import { ToastGenerator } from "@shared-components/toast-generator";

interface PerformanceDataProps {
  body: [day: number, month: number, year: number, percent: number | null];
  elementIndex: number;
}

interface PerformanceChartProps {
  performanceData?: Array<PerformanceDataProps>;
  setPerformanceData: (v: any) => void;
  indexes: { start: number; end: number };
  columnsInfo: Array<object>;
}

const TableBody = (props: PerformanceChartProps) => {
  const dict = useLanguageDictionary();
  const toastRef = useRef<any>();

  const updatePerformance = (e: FocusEvent<HTMLInputElement>, targetMonth: string, index: number) => {
    if (e.target.value) {
      const body = {
        day: Number(e.target.dataset.day),
        month: Number(e.target.dataset.month),
        year: Number(e.target.dataset.year),
        performance: Number(e.target.value),
      };

      fetchJSON("/performances", "PUT", body)
        .then((res) => {
          let date: string;
          let day = body.day < 10 ? "0" + body.day : body.day;
          let month = body.month < 10 ? "0" + body.month : body.month;

          date = day + "/" + month + "/" + body.year;

          toastRef.current.addToast({
            index: Math.random().toString(36).substring(2, 9),
            textContent: dict.successBannerFirstPart + " " + date + " " + dict.successBannerSecondPart,
            type: "SUCCESS",
            title: dict.dataSaved,
          });
        })
        .catch(console.error);
    }
  };

  useEffect(() => {
    toastRef.current.changeDisplayToastLimit(3);
  }, []);

  const checkValueBeforeUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    var regex = /^[-]?[0-9.,\b]+$/;

    if (!regex.test(e.target.value)) {
      e.target.value = "0";
    } else {
      if (e.target.value.length > 1 && e.target.value[0] === "0" && !e.target.value.includes(".") && !e.target.value.includes(",")) {
        e.target.value = e.target.value.slice(1);
      }

      if (+e.target.value > 100.0) {
        e.target.value = e.target.value.slice(0, 2);
      }

      if (e.target.value.includes(".") || e.target.value.includes(",")) {
        if (e.target.value.split(".")[1].length > 2) {
          e.target.value = e.target.value.slice(0, -1);
        }
      }
    }
  };

  const getStatus = (startIndex: number, index: number) => {
    if (props.columnsInfo) {
      let object: any = props.columnsInfo[startIndex + index];

      if (object) {
        return object.status;
      }
    }
    return "NOT_APPLICABLE";
  };

  return (
    <GradientBorder>
      <div
        className="w-full bg-fake-white dark:bg-fake-black p-[21px] grid grid-cols-1 sm:grid-cols-3 
      md:grid-cols-4 lg:grid-cols-4 2lg:grid-cols-5 
      xl:grid-cols-6 2xl:grid-cols-7 3xl:grid-cols-8 gap-x-6 items-start rounded-r-sm rounded-bl-sm rounded-tl-none"
      >
        <ToastGenerator ref={toastRef} />
        {props.performanceData
          ? props.performanceData.slice(props.indexes.start, props.indexes.end).map((object: any, columnIndex: number) => (
              <div className="flex flex-col" key={columnIndex}>
                {object.body.map((item: any, x: number) => (
                  <div
                    key={item.day + " " + item.month + " " + item.year}
                    className={`mb-[8px] p-0 rounded-sm flex items-center justify-between relative mx-auto max-w-[122px] w-full`}
                  >
                    <p
                      className={`left-[10px] text-[13px] absolute
                           ${Date.now() < new Date(item.year, item.month - 1, item.day).getTime() && "cursor-not-allowed text-gray"}
                      `}
                    >
                      {item.day}{" "}
                    </p>
                    <input
                      step={"0.01"}
                      onBlur={(e) => updatePerformance(e, object.month, x)}
                      data-day={item.day}
                      data-month={item.month}
                      data-year={item.year}
                      className={`w-full text-right text-md bg-white dark:bg-dark-gray px-7 py-1 rounded-sm focus:outline-gold 
                          ${getStatus(props.indexes.start, columnIndex) === "DONE" && "text-gray cursor-not-allowed"}
                          ${getStatus(props.indexes.start, columnIndex) === "DONE" && "text-gray cursor-not-allowed"} 
                          ${Date.now() < new Date(item.year, item.month - 1, item.day).getTime() && "cursor-not-allowed text-gray"}
                          ${
                            getStatus(props.indexes.start, columnIndex) !== "DONE" &&
                            Date.now() > new Date(item.year, item.month - 1, item.day).getTime() &&
                            item.percent === null &&
                            "border-2 outline-light-gray dark:border-gray focus:outline-gold"
                          }
                        `}
                      type="number"
                      onInput={checkValueBeforeUpdate}
                      defaultValue={item.percent}
                      disabled={
                        getStatus(props.indexes.start, columnIndex) === "DONE" ||
                        Date.now() < new Date(item.year, item.month - 1, item.day).getTime()
                          ? true
                          : false
                      }
                    />
                    <p
                      className={`right-[10px] text-md absolute 
                        ${Date.now() < new Date(item.year, item.month - 1, item.day).getTime() && "cursor-not-allowed text-gray"}
                      `}
                    >
                      %
                    </p>
                  </div>
                ))}
              </div>
            ))
          : null}
      </div>
    </GradientBorder>
  );
};

export default TableBody;
