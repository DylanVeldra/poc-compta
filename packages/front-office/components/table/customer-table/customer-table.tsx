import { useLanguageDictionary } from "@shared-hooks";
import { CenteredHeader, PaginatedTable } from "@shared-components/table";
import { useRouter } from "next/router";
import { UserRow } from "@shared-types";
import { Customer } from "types/Customer";

interface CustomerTableProps {
  customers: Customer[];
  showRejectUserModal?: (user: UserRow) => void;
  showUniqueAddressModal?: (user: UserRow) => void;
  nbPages?: number;
  onCurrentPageChange: (current: number) => void;
}

export function CustomerTable(props: CustomerTableProps) {
  const dict = useLanguageDictionary();
  const router = useRouter();

  return (
    <PaginatedTable
      onLineClick={(customer) => router.push(`/customer/${customer.id}`)}
      headers={
        {
          name: "i18n todo name customer",
          country: "i18n todo name country",
          registryId: "i18n todo name registry",
        }
      }
      data={props.customers}
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
