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
import { IncomeTable } from "components/table/income-table";
import { Income } from "types/Income";
import { Button } from "@shared-components/buttons";

export default function Incomes() {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [search, setSearch] = useState("");
  const [nbPages, setNbPages] = useState(1);
  const dict = useLanguageDictionary();
  const router = useRouter();

  const getIncomesByPage = (current: number) => {
    fetchJSON("/incomes?limit=20&page=" + current).then((json) => {
      setNbPages(json.body.nbPages);
      setIncomes(json.body.data);
    });
  };

  const title = `${
    process.env.NEXT_PUBLIC_APP_NAME
  } | ${dict.income.pageTitle.toUpperCase()}`;

  return (
    <UserLayout
      title={dict.income.pageTitle}
      pathname={router.pathname}
      onProfileLoaded={() => getIncomesByPage(1)}
      navItems={navigationItemsFrontOffice}
    >
      <Head>
        <title>{title}</title>
      </Head>
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
            onClick={() => router.push('invoice/create')}
            size="lg"
          />
        </div>
 
      </div>
      <div className="w-full">
        <Divider />
        <div className="block">
          <IncomeTable
            incomes={incomes}
            onCurrentPageChange={getIncomesByPage}
            nbPages={nbPages}
          />
        </div>
      </div>
    </UserLayout>
  );
}
