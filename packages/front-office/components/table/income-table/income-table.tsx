import { useLanguageDictionary } from "@shared-hooks";
import { CenteredHeader, PaginatedTable } from "@shared-components/table";
import { formatDate } from "@shared-utils";
import { Button } from "@shared-components/buttons";
import { useRouter } from "next/router";
import { UserRow } from "@shared-types";
import { Income } from "types/Income";

interface IncomeTableProps {
  incomes: Income[];
  showRejectUserModal?: (user: UserRow) => void;
  showUniqueAddressModal?: (user: UserRow) => void;
  nbPages?: number;
  onCurrentPageChange: (current: number) => void;
}

export function IncomeTable(props: IncomeTableProps) {
  const dict = useLanguageDictionary();
  const router = useRouter();

  return (
    <PaginatedTable
      onLineClick={(income) => router.push(`/income/${income.id}`)}
      headers={
        {
          payer: dict.income.payer,
          type: dict.income.type,
          id: dict.income.id,
          date: dict.income.date,
          amount: dict.income.amount,
          status: dict.income.status
        }
      }
      data={props.incomes}
      emptyMessage={dict.income.noIncome}
      nbPages={props.nbPages || 1}
      pageSize={20}
      onCurrentPageChange={props.onCurrentPageChange}
      customHeaders={{
        status: CenteredHeader,
      }}
      customColumns={{
      }}
    />
  );
}
