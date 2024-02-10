import * as Yup from "yup";
import { useLanguageDictionary } from "@shared-hooks";

export const InvoiceValidation = () => {
  const dict = useLanguageDictionary();

  return {
    schema: Yup.object().shape({
      customerId: Yup.number().required(dict.invoice.form.customerId.required),
      description: Yup.string(),
      dueDate: Yup.date().required(dict.invoice.form.dueDate.required),
      currency: Yup.date().required(dict.invoice.form.currency.required),
      accountBankId: Yup.number().required(
        dict.invoice.form.accountBankId.required
      ),
      rows: Yup.array(
        Yup.object().shape({
          type: Yup.string().required(dict.invoiceRow.form.type.required),
          description: Yup.string().required(
            dict.invoiceRow.form.description.required
          ),
          quantity: Yup.number().required(
            dict.invoiceRow.form.quantity.required
          ),
          pricePerUnit: Yup.string().required(
            dict.invoiceRow.form.pricePerUnit.required
          ),
          discount: Yup.string(),
        })
      ),
    }),
    initialValues: {
      customerId: undefined,
      description: "",
      dueDate: new Date(),
      currency: "EUR",
      accountBankId: undefined,
      rows: [
        {
          type: undefined,
          amount: undefined,
          description: undefined,
          pricePerUnit: undefined,
          vat: undefined,
        },
      ],
    },
  };
};
