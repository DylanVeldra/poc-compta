import { UserYearlyPerformance } from "./UserYearlyPerformance";

export interface UserYearlyPerformanceByMonths extends UserYearlyPerformance {
  year: number;
  month: string;
  index: number;
}
