import Head from "next/head";
import { useRouter } from "next/router";
import { UserLayout } from "@shared-components/user-layout";
import { useLanguageDictionary } from "@shared-hooks";
import { Divider } from "@shared-components/divider";
import { fetchJSON } from "@shared-utils";
import { useEffect, useState } from "react";
import { FinancialOperationDto } from "@shared-types";
import { Checkbox } from "@shared-components/inputs";
import { Icon } from "@shared-components/icon";
import IconInput from "@shared-components/inputs/icon-input";
import {
  FinancialOperationTable,
  withdrawalToFinancialOperation,
  depositToFinancialOperation,
  feesToFinancialOperation,
} from "@shared-components/financial-operation-table";
import { DateTime } from "luxon";
import { TransactionSidePanel } from "@shared-components/transactions";
import { navigationItemsFrontOffice } from "var/navigation";

export default function History() {
  const [transactions, setTransactions] = useState(
    [] as FinancialOperationDto[]
  );
  const [filters, setFilters] = useState(["deposit", "withdrawal", "fees"]);
  const [filteredTransactions, setFilteredTransaction] = useState<
    FinancialOperationDto[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const dict = useLanguageDictionary();
  const router = useRouter();
  const [selectedOperation, setSelectedOperation] =
    useState<FinancialOperationDto | null>(null);

  useEffect(() => {
    setFilteredTransaction(
      filters
        .map((filter: any) => {
          return transactions.filter(
            (t: FinancialOperationDto) => t.operation === filter
          );
        })
        .flat()
    );
  }, [filters, transactions, setFilteredTransaction]);

  const getTransactions = async () => {
    const withdrawals = (await fetchJSON("/transaction/withdrawal")).body.map(
      withdrawalToFinancialOperation
    );
    const deposits = (await fetchJSON("/transaction/deposit")).body.map(
      depositToFinancialOperation
    );
    const fees = (await fetchJSON("/transaction/fee")).body.map(
      feesToFinancialOperation
    );

    setTransactions([...withdrawals, ...deposits, ...fees]);
  };

  const onProfileLoaded = async () => {
    await getTransactions();
  };

  const updateFilters = (checked: boolean, filter: string) => {
    const updatedFilters = filters.concat(filter);

    setFilters(
      checked ? updatedFilters : updatedFilters.filter((f) => f !== filter)
    );
  };

  const openFinancialOperation = (
    financialOperation: FinancialOperationDto
  ) => {
    setSelectedOperation(financialOperation);
  };

  const title = `${
    process.env.NEXT_PUBLIC_APP_NAME
  } | ${dict.history.history.toUpperCase()}`;

  return (
    <UserLayout
      title={dict.history.history}
      pathname={router.pathname}
      navItems={navigationItemsFrontOffice}
      onProfileLoaded={onProfileLoaded}
    >
      <Head>
        <title>{title}</title>
      </Head>
      <TransactionSidePanel
        onClose={() => setSelectedOperation(null)}
        operation={selectedOperation}
      />
      <div className="flex flex-col md:flex-row mt-[70px] mb-[50px]">
        <div className="w-full rounded-md">
          <IconInput
            name="operationId"
            onChange={(v: string) => setSearch(v.toUpperCase())}
            type="search"
            placeholder={dict.history.searchByOperationId}
            maxlength={6}
            value={search}
            icon={<Icon src="rs-search" />}
          />
        </div>
        <div className="flex flex-row grow items-center pl-[40px] mt-4 md:mt-0">
          <div className="mr-[40px]">
            <Checkbox
              name="deposit"
              label={dict.deposit.deposit}
              checked={true}
              onChange={updateFilters}
            />
          </div>
          <div className="mr-[40px]">
            <Checkbox
              name="withdrawal"
              label={dict.withdrawal.withdrawal}
              checked={true}
              onChange={updateFilters}
            />
          </div>
          <div>
            <Checkbox
              name="fees"
              label={dict.deposit.fees}
              checked={true}
              onChange={updateFilters}
            />
          </div>
        </div>
      </div>
      <div className="lg:min-w-[1190px]">
        <Divider />
        <div className="hidden lg:block">
          <FinancialOperationTable
            operations={filteredTransactions
              .sort((a, b) => {
                return DateTime.fromISO(a.emitDate ?? a.statusUpdateDate) <
                  DateTime.fromISO(b.emitDate ?? b.statusUpdateDate)
                  ? 1
                  : -1;
              })
              .filter((transaction) => transaction.publicId.includes(search))
              .slice((currentPage - 1) * 20, currentPage * 20)}
            headers={{
              operation: dict.history.operation,
              publicId: dict.history.operationId,
              emitDate: dict.history.operationDate,
              statusUpdateDate: dict.history.operationProcessedDate,
              rawAmount: dict.history.gross,
              netAmount: dict.history.net,
              transactionId: dict.deposit.transactionId,
              token: dict.deposit.token,
              status: dict.deposit.status,
            }}
            emptyTableLabel={dict.history.noOperations}
            nbPages={~~(filteredTransactions.length / 20 + 1)}
            openOperation={openFinancialOperation}
            onCurrentPageChange={setCurrentPage}
          />
        </div>
        <div className="block lg:hidden">
          <FinancialOperationTable
            operations={filteredTransactions.slice(
              (currentPage - 1) * 20,
              currentPage * 20
            )}
            emptyTableLabel={dict.history.noOperations}
            headers={{
              operation: dict.history.operation,
              publicId: dict.deposit.publicId,
              statusUpdateDate: dict.history.operationProcessedDate,
              netAmount: dict.history.net,
              token: dict.deposit.token,
              status: dict.deposit.status,
            }}
            nbPages={~~(filteredTransactions.length / 20 + 1)}
            openOperation={openFinancialOperation}
            onCurrentPageChange={setCurrentPage}
          />
        </div>
      </div>
    </UserLayout>
  );
}
