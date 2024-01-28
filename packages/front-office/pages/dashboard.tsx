import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useLanguageDictionary } from "@shared-hooks";
import { UserLayout } from "@shared-components/user-layout";
import { fetchJSON, getTokenLogoUrl } from "@shared-utils";
import { Divider } from "@shared-components/divider";
import { FinancialOperationDto } from "@shared-types";
import { PerformanceSummary } from "components/perfomance-summary";
import { LinkButton } from "@shared-components/buttons";
import { PendingOperation } from "components/pending-operation";
import {
  FinancialOperationTable,
  depositToFinancialOperation,
  withdrawalToFinancialOperation,
  feesToFinancialOperation,
} from "@shared-components/financial-operation-table";
import { DateTime } from "luxon";
import { TransactionSidePanel } from "@shared-components/transactions";

export default function Dashboard() {
  const router = useRouter();
  const dict = useLanguageDictionary();
  const [transactions, setTransactions] = useState<FinancialOperationDto[]>([]);
  const [selectedOperation, setSelectedOperation] =
    useState<FinancialOperationDto | null>(null);

  const getTransactions = async () => {
  //   const deposits = (await fetchJSON("/transaction/deposit")).body.map(
  //     depositToFinancialOperation
  //   );
  //   const withdrawals = (await fetchJSON("/transaction/withdrawal")).body.map(
  //     withdrawalToFinancialOperation
  //   );
  //   const fees = (await fetchJSON("/transaction/fee")).body.map(
  //     feesToFinancialOperation
  //   );

    setTransactions([]);
  };

  const PendingTransactionsList = () => {
    return (
      <div className="max-h-[285px] 2xl:max-h-[350px] overflow-y-auto p-0.5 space-y-3">
        {transactions
          .sort((a, b) => {
            return DateTime.fromISO(a.emitDate ?? a.statusUpdateDate) <
              DateTime.fromISO(b.emitDate ?? b.statusUpdateDate)
              ? 1
              : -1;
          })
          .filter((transaction) => transaction.status === "PENDING")
          .map((transaction: FinancialOperationDto) => {
            return (
              <div
                key={transaction.publicId}
                className="cursor-pointer"
                onClick={() => setSelectedOperation(transaction)}
              >
                <PendingOperation
                  operationType={transaction.operation}
                  logoUrl={getTokenLogoUrl(transaction.token)}
                  date={transaction.emitDate}
                  amount={transaction.netAmount}
                />
              </div>
            );
          })}
      </div>
    );
  };

  const openOperation = (operation: FinancialOperationDto) => {
    setSelectedOperation(operation);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const title = `${
    process.env.NEXT_PUBLIC_APP_NAME
  } | ${dict.dashboard.title.toUpperCase()}`;

  return (
    <UserLayout
      pathname={router.pathname}
      title={dict.accountManagement.sidebar[0]}
    >
      <Head>
        <title>{title}</title>
      </Head>
      <TransactionSidePanel
        onClose={() => setSelectedOperation(null)}
        operation={selectedOperation}
      />
      <PerformanceSummary showProfitTable={false} />
      <div className="flex flex-col 2xl:flex-row lg:justify-between">
        <div className="flex flex-col grow">
          <h3 className="text-lg font-semibold">{dict.dashboard.recent}</h3>
          {transactions?.length ? (
            <div className="mb-[22px] flex justify-end">
              <LinkButton
                label={dict.deposit.seeMore}
                onClick={() => router.push("/history")}
              />
            </div>
          ) : (
            <></>
          )}
          <Divider className="h-[1px]" />
          <div className="hidden lg:block">
            <FinancialOperationTable
              emptyTableLabel={dict.dashboard.noOperations}
              openOperation={openOperation}
              operations={transactions.slice(0, 5).sort((a, b) => {
                return DateTime.fromISO(a.emitDate ?? a.statusUpdateDate) <
                  DateTime.fromISO(b.emitDate ?? b.statusUpdateDate)
                  ? 1
                  : -1;
              })}
              headers={{
                operation: dict.history.operation,
                emitDate: dict.history.operationDate,
                statusUpdateDate: dict.history.operationProcessedDate,
                rawAmount: dict.history.gross,
                netAmount: dict.history.net,
                token: dict.deposit.token,
                status: dict.deposit.status,
              }}
            />
          </div>
          <div className="block lg:hidden">
            <FinancialOperationTable
              operations={transactions.slice(0, 5).sort((a, b) => {
                return DateTime.fromISO(a.emitDate ?? a.statusUpdateDate) <
                  DateTime.fromISO(b.emitDate ?? b.statusUpdateDate)
                  ? 1
                  : -1;
              })}
              emptyTableLabel={dict.dashboard.noOperations}
              headers={{
                operation: dict.history.operation,
                publicId: "ID",
                statusUpdateDate: dict.history.notificationDate,
                netAmount: dict.history.net,
                token: dict.deposit.token,
                status: dict.deposit.status,
              }}
              openOperation={openOperation}
            />
          </div>
        </div>
        <div className="hidden lg:block border-r-[1px] border-light-gray dark:border-gray mx-[40px]"></div>
        <div className="md:min-w-[350px] mt-[0px] lg:mt-[60px] 2xl:mt-[0px]">
          <h3 className="text-lg font-semibold mb-[48px] mt-[48px] lg:mt-0">
            {dict.dashboard.pending} (
            {
              transactions.filter(
                (transaction) => transaction.status === "PENDING"
              ).length
            }
            )
          </h3>
          <PendingTransactionsList />
        </div>
      </div>
    </UserLayout>
  );
}
