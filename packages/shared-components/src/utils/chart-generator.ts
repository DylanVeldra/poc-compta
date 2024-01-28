import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
  ChartItem,
} from 'chart.js';
import 'chartjs-adapter-luxon';
import { DateTime } from 'luxon';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
);

interface DataProps {
  labels: DateTime[];
  datasets: Array<object>;
}

export class ChartGenerator {
  type: string | any;
  data: DataProps;
  options: object;

  constructor(
    type = 'line',
    data = { labels: [] as DateTime[], datasets: [{}] },
    options = {},
  ) {
    this.type = type;
    this.data = data;
    this.options = options;
  }

  generatePerformanceMonthlyChart(ctx: ChartItem) {
    return new Chart(ctx, {
      type: this.type,
      data: this.data,
      options: this.options,
      plugins: [
        {
          afterDraw: (chart: any) => {
            if (chart.tooltip?._active?.length) {
              let x =
                chart.tooltip._active[chart.tooltip._active.length - 1].element
                  .x;
              let y =
                chart.tooltip._active[chart.tooltip._active.length - 1].element
                  .y;
              let yAxis = chart.scales.y;
              let ctx = chart.ctx;
              ctx.save();
              ctx.beginPath();

              ctx.moveTo(x, y);
              ctx.lineTo(x, yAxis.bottom);

              ctx.lineWidth = 2;
              ctx.strokeStyle = '#C4AB61';
              ctx.stroke();
              ctx.restore();
            }
          },
        } as any,
      ],
    });
  }
}
