import Head from "next/head";
import { useRouter } from "next/router";
import { UserLayout } from "@shared-components/user-layout";
import { useLanguageDictionary } from "@shared-hooks";
import { Divider } from "@shared-components/divider";
import { useState } from "react";
import { fetchJSON } from "@shared-utils";
import { Icon } from "@shared-components/icon";
import IconInput from "@shared-components/inputs/icon-input";
import { navigationItemsFrontOffice } from "var/navigation";
import { Customer } from "types/Customer";
import { CustomerTable } from "components/table/customer-table";
import { Button } from "@shared-components/buttons";
import { CustomerFormSidePanel } from "components/customer/customer-form-side-panel";

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(null)
  const [search, setSearch] = useState("");
  const [nbPages, setNbPages] = useState(1);
  const dict = useLanguageDictionary();
  const router = useRouter();

  const getCustomersByPage = (current: number) => {
    fetchJSON("/customers?limit=20&page=" + current).then((json) => {
      setNbPages(json.body.nbPages);
      setCustomers(json.body.data);
    });
  };

  const title = `${
    process.env.NEXT_PUBLIC_APP_NAME
  } | dict.customer.pageTitle.toUpperCase()`;

  return (
    <UserLayout
      title={"dict.customer.pageTitle"}
      pathname={router.pathname}
      onProfileLoaded={() => getCustomersByPage(1)}
      navItems={navigationItemsFrontOffice}
    >
      <Head>
        <title>{title}</title>
      </Head>
      <CustomerFormSidePanel
        onClose={() => setSelectedCustomer(null)}
        customer={selectedCustomer}
      />
      <div className="flex mt-[70px] mb-[50px] gap-8">
        <div className="w-full rounded-md">
          <IconInput
            name="operationId"
            onChange={(v: any) => setSearch(v.toUpperCase())}
            type="search"
            placeholder={dict.userManagement.searchPlaceholder}
            maxlength={6}
            value={search}
            icon={<Icon src="rs-search" />}
          />
        </div>
        <div>
          <Button
            label={"dict.customer.create"}
            onClick={() => setSelectedCustomer({} as Customer)}
            size="lg"
          />
        </div>
      </div>
      <div className="w-full">
        <Divider />
        <div className="block">
          <CustomerTable
            customers={customers}
            onCurrentPageChange={getCustomersByPage}
            nbPages={nbPages}
          />
        </div>
      </div>
    </UserLayout>
  );
}
