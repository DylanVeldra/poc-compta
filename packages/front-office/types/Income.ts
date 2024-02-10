import { Customer } from "./Customer";
import { INVOICE_STATUS } from "./Invoice";

export enum IncomeType {
  INTEREST = "INTEREST",
  INVOICE = "INVOICE",
}

export type Income = {
  type: IncomeType;
  payer: Customer;
  date: Date;
  id: number;
  amount: number;
  status: INVOICE_STATUS;
};
