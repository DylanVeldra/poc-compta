import { Icon } from "@shared-components/icon";
import { useLanguageDictionary } from "@shared-hooks";

interface AddressStatusProps {
  status: string;
}

const AddressStatus = (props: AddressStatusProps) => {
  const dict = useLanguageDictionary() as any;
  return (
    <div className="flex justify-center text-md">
      {props.status === "ENABLED" ? (
        <div className="flex items-center justify-center flex-row  text-green min-w-[100px] bg-light-green dark:bg-fake-black rounded-md">
          <Icon src={"rs-check"} className="mr-[8px]" />
          {dict.addressStatus.enabled}
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center text-gray flex-row space-x-2 bg-fake-white dark:bg-fake-black min-w-[100px] rounded-md">
            <Icon src={"rs-ban"} />
            <span>{dict.addressStatus.disabled}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default AddressStatus;
