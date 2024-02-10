export type InvoiceRow = {
  id: number;
  type: string;
  description: string;
  // TODO passer en string
  // In Cent
  amount: number;
  // In Cent
  pricePerUnit: number;
  vat: number;
};

export enum INVOICE_STATUS {
  DRAFT = "DRAFT",
  UNPAID = "UNPAID",
  PAID = "PAID",
  BAD_DEBT = "BAD_DEBT",
}

export type Invoice = {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  status: INVOICE_STATUS;
  comptabilityId: number;
  validatedAt: Date;
  description: string;
  currency: string;
  pdfDocumentUrl?: string;

  companyId: number;
  customerId: number;

  rows: InvoiceRow[];
};

export type CreateInvoiceRow = {
  type: string;
  description: string;
  // TODO passer en string
  // In Cent
  amount: number;
  // In Cent
  pricePerUnit: number;
  vat: number;
};

export type CreateInvoiceDTO = {
  description: string;
  currency: string;
  rows: CreateInvoiceRow[];
  customerId: number;
};
