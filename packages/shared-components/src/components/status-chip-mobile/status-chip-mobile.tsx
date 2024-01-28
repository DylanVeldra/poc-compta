import { Icon } from "@shared-components/icon";
import { FinancialOperationStatus } from "@shared-types";

interface StatusChipMobileProps {
  status: FinancialOperationStatus;
}

export default function StatusChipMobile(props: StatusChipMobileProps) {
  const colors = {
    DRAFT: "bg-fake-white text-black dark:text-white",
    PENDING: "bg-fake-white text-black dark:text-white",
    DONE: "bg-light-green text-green dark:text-dark-green",
    CANCELLED: "bg-fake-white text-silver",
    REFUSED: "bg-light-red text-red",
    VALIDATED: "bg-green text-green",
  };
  return (
    <div
      className={`w-[22px] h-[22px] text-md text-center flex justify-center items-center dark:bg-fake-black rounded-md ${
        colors[props.status]
      }`}
    >
      <Icon src={"rs-check"} />
    </div>
  );
}
