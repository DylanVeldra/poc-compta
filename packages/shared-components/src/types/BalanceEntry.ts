export interface BalanceEntry {
  date: string
  rawBalance: number
  rawProfit: number
  netProfit: number
  feeProfit: number
  perf: number
  transactions: {
    type: "DEPOSIT" | "WITHDRAWAL" | "FEES"
    amount: number
    id: number
  }[]
}
