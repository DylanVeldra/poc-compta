import { BalanceEntry } from "@shared-types"
import { Chart } from "chart.js"
import { DateTime } from "luxon"

type DataSeries = { label: DateTime; value: number }[]

const datasetGenerator = (
  balanceHistory: BalanceEntry[],
  valueToDisplay: "rawBalance" | "rawProfit" | "apr-apy",
  scaleSelected: "3M" | "1Y" | "3Y" | "ALL"
) => {
  let labels: DateTime[] = []
  let data: number[] = []

  // APR / APY
  let data1: DataSeries = []
  let data2: DataSeries = []

  if (valueToDisplay !== "apr-apy") {
    balanceHistory.forEach((history, idx) => {
      if (
        valueToDisplay === "rawProfit" &&
        scaleSelected !== "3M" &&
        idx % 3 !== 0
      ) {
        return
      }
      labels.push(DateTime.fromISO(history.date))
      data.push(history[valueToDisplay] / 100)
    })
  } else {
    data1 = balanceHistory.reduce<DataSeries>((acc, cur) => {
      const previousInterest = acc[acc.length - 1]?.value ?? 0

      acc.push({
        label: DateTime.fromISO(cur.date),
        value: previousInterest + cur.perf,
      })
      return acc
    }, [])

    data2 = balanceHistory
      .map((history) => ({
        label: DateTime.fromISO(history.date),
        value: history.perf,
      }))
      .reduce<DataSeries>((acc, cur) => {
        const previousInterest = acc[acc.length - 1]?.value ?? 0

        acc.push({
          label: cur.label,
          value: previousInterest + cur.value * (1 + previousInterest / 100),
        })
        return acc
      }, [])
  }

  let dataset = {
    labels,
    datasets: [
      {
        indexAxis: "x",
        label: "",
        unit: "$",
        fill: true,
        data,
        backgroundColor: function (context: any) {
          const chart = context.chart
          const { ctx, chartArea } = chart as Chart

          if (!chartArea) {
            // This case happens on initial chart load
            return
          }
          let width, height, gradient

          const chartWidth = chartArea.right - chartArea.left
          const chartHeight = chartArea.bottom - chartArea.top
          if (!gradient || width !== chartWidth || height !== chartHeight) {
            width = chartWidth
            height = chartHeight
            gradient = ctx.createLinearGradient(
              0,
              chartArea.bottom,
              0,
              chartArea.top
            )
            gradient.addColorStop(0, "rgba(225, 203, 138, 0.1)")
            gradient.addColorStop(1, "rgba(224, 199, 123, 0.6)")
          }
          return gradient
        },
        borderColor: "#C4AB61",
        borderWidth: 5,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: "#C4AB61",
        pointHoverBorderWidth: 0,
      },
    ],
  }

  if (valueToDisplay === "apr-apy") {
    dataset = {
      labels: data1.map((item) => item.label),
      datasets: [
        {
          indexAxis: "x",
          label: "APR",
          unit: "%",
          fill: true,
          data: data1.map((item) => item.value),
          backgroundColor: function (context: any) {
            const chart = context.chart
            const { ctx, chartArea } = chart as Chart

            if (!chartArea) {
              // This case happens on initial chart load
              return
            }
            let width, height, gradient

            const chartWidth = chartArea.right - chartArea.left
            const chartHeight = chartArea.bottom - chartArea.top
            if (!gradient || width !== chartWidth || height !== chartHeight) {
              width = chartWidth
              height = chartHeight
              gradient = ctx.createLinearGradient(
                0,
                chartArea.bottom,
                0,
                chartArea.top
              )
              gradient.addColorStop(0, "rgba(194, 97, 112, 0)")
              gradient.addColorStop(1, "rgba(194, 97, 112, 0.36)")
            }

            return gradient
          },
          borderColor: "rgb(194, 97, 112)",
          borderWidth: 5,
          pointHoverRadius: 4,
          pointHoverBackgroundColor: "#C4AB61",
          pointHoverBorderWidth: 0,
        },
        {
          indexAxis: "x",
          label: "APY",
          unit: "%",
          fill: true,
          data: data2.map((item) => item.value),
          backgroundColor: function (context: any) {
            const chart = context.chart
            const { ctx, chartArea } = chart as Chart

            if (!chartArea) {
              // This case happens on initial chart load
              return
            }
            let width, height, gradient

            const chartWidth = chartArea.right - chartArea.left
            const chartHeight = chartArea.bottom - chartArea.top
            if (!gradient || width !== chartWidth || height !== chartHeight) {
              width = chartWidth
              height = chartHeight
              gradient = ctx.createLinearGradient(
                0,
                chartArea.bottom,
                0,
                chartArea.top
              )
              gradient.addColorStop(0, "rgba(108, 157, 84, 0)")
              gradient.addColorStop(1, "rgba(108, 157, 84, 0.36)")
            }

            return gradient
          },
          borderColor: "rgb(108, 157, 84)",
          borderWidth: 5,
          pointHoverRadius: 4,
          pointHoverBackgroundColor: "#C4AB61",
          pointHoverBorderWidth: 0,
        },
      ],
    }
  }

  return dataset
}

export default datasetGenerator
