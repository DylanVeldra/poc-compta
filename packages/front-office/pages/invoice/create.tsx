import Head from "next/head";
import { useRouter } from "next/router";
import { UserLayout } from "@shared-components/user-layout";
import { useLanguageDictionary } from "@shared-hooks";
import { Divider } from "@shared-components/divider";
import { useState } from "react";
import { fetchJSON } from "@shared-utils";
import { navigationItemsFrontOffice } from "var/navigation";
import { Button } from "@shared-components/buttons";
import { Customer } from "types/Customer";
import { yupResolver } from "@hookform/resolvers/yup";
import { InvoiceValidation } from "components/invoice/invoiceValidation";
import { FieldPathValue, Path, useForm } from "react-hook-form";
import ReactHookDropList from "@shared-components/inputs/react-hook/react-hook-drop-list";
import { CreateInvoiceDTO, CreateInvoiceRow } from "types";
import { SubWindow } from "@shared-components/sub-window";
import { ContainerWithTitle } from "@shared-components/container-with-title";
import { Table } from "@shared-components/table";

export default function CreateInvoice() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [curInvoice, setCurInvoice] = useState<CreateInvoiceDTO>({ rows: [{
          type: undefined,
          amount: undefined,
          description: undefined,
          pricePerUnit: undefined,
          vat: undefined,
        }]} as CreateInvoiceDTO)
  const [curRows, setCurRows] = useState<CreateInvoiceRow[]>([{
          type: undefined,
          amount: undefined,
          description: undefined,
          pricePerUnit: undefined,
          vat: undefined,
        }])

  const [nbPages, setNbPages] = useState(1);
  const dict = useLanguageDictionary();
  const router = useRouter();

  console.log(curInvoice.rows)

  const {
    trigger,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm({
    resolver: yupResolver(InvoiceValidation().schema),
    defaultValues: InvoiceValidation().initialValues,
    mode: "onBlur",
  });

  const getCustomersByPage = (current: number) => {
    fetchJSON("/customers?limit=20&page=" + current).then((json) => {
      setNbPages(json.body.nbPages);
      setCustomers(json.body.data);
    });
  };

  const onChange = <T extends Path<typeof register>>(v: T, x: FieldPathValue<typeof register, T>) => {
    setValue(v, x)
    console.log('toto')
    setCurInvoice(getValues())
    setCurRows(curInvoice.rows ?? [])
  }

  const addRow = () => {
    console.log(curInvoice.rows)
    curInvoice.rows.push({
          type: undefined,
          amount: undefined,
          description: undefined,
          pricePerUnit: undefined,
          vat: undefined,
        })
    setCurInvoice(curInvoice)
    setCurRows([...curInvoice.rows] ?? [])
  }

  const onSubmitHandler = () => {
    const values = getValues();
    fetchJSON("/customers", "POST", values)
      .then(() => {
        //TODO actualise()
      })
      .catch((reason) => {
        if (reason.i18n) {
          let errorMessage = dict.i18nServerErrors?.[reason.i18n] || dict.i18nServerErrors.INTERNAL_SERVER_ERROR;
          // toastRef.current.addToast({
          // index: Math.random().toString(36).substring(2, 9),
          //   textContent: errorMessage
          //     ? errorMessage
          //     : dict.i18nServerErrors.general,
          //   type: "ERROR",
          //   title: "Oops !",
          // });
          console.error(reason);
        }
    });
  };



  const title = `${
    process.env.NEXT_PUBLIC_APP_NAME
  } | ${dict.income.pageTitle.toUpperCase()}`;

  return (
    <UserLayout
      title={dict.income.pageTitle}
      pathname={router.pathname}
      onProfileLoaded={() => getCustomersByPage(1)}
      navItems={navigationItemsFrontOffice}
    >
      <Head>
        <title>{title}</title>
      </Head>


      <div className="flex mt-[70px] mb-[50px] gap-8">
        <div className="w-[50%]">
      <SubWindow
        header={"dict.invoice.form.to"}
        
      >
          <ReactHookDropList
            list={customers.map(customer => ({label: customer.name, value: customer.id}))}
            defaultValue=""
            name="taxResidenceCountry"
            updateForm={onChange}
            label={"dict.invoice.form.customer.label"}
            currentValue={curInvoice.customerId}
            placeholder={"dict.invoice.form.customer.placeholder"}
            errors={errors}
            searchInput={true}
            filterKey={'label'}
          />
          </SubWindow>

        </div>
        <div className="w-[50%]">
          <SubWindow
            header={"dict.invoice.form.from"}
            >
            TODO display company info
          </SubWindow>
        </div>

      </div>
      <div className="w-full">
        <Divider />
          <div className="w-full flex justify-between">
            <div>
              invoice number
            </div>
            <div>
              invoice date
            </div>
            <div>
              due date
            </div>
            <div>
              currency
            </div>

            <div>
              bank account
            </div>

            <div>
              interest
            </div>
          </div>
        <Divider />
<Table
data={curRows}
emptyMessage={"dict.invoice.form.emptyRows"}
headers={
  {
    type: "dict.invoice.form.typeRow.header",
    description: "dict.invoice.form.descriptionRow.header",
    quantity: "dict.invoice.form.quantityRow.header",
    price: "dict.invoice.form.priceRow.header",
    discount: "dict.invoice.form.discountRow.header",
    netAmount: "dict.invoice.form.netAmountRow.header",
    vat: "dict.invoice.form.vatRow.header",
  }
}
></Table>

<Button label="Add Row"
size="md"
buttonWidth={120}
  onClick={addRow}
/>
    </div>
    </UserLayout>
  );
}
