import { ReactNode } from "react";
import { Button } from "../buttons";
import { useLanguageDictionary } from "@shared-hooks";
import { useRouter } from "next/router";

// Helpers
import { fetchJSON, generateFrMonthPreposition } from "@shared-utils";
import { Modal } from "./modal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  toastRef: any;
  toggleColumnsInfo: ([]) => void;
  columnsInfo: Array<object>;
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  details: {
    year: number | string;
    month: number;
    index: number;
  };
}

export const PerformColumnFreezeModal = (props: ModalProps) => {
  const dict = useLanguageDictionary() as any;
  const { locale } = useRouter();

  const handleFormSubmit = () => {
    fetchJSON(
      `/performances/freeze/${props.details.year}/${props.details.month}`,
      "POST"
    )
      .then((json) => {
        // @TODO handle error cases
        if (json.i18n !== "OK") {
          throw new Error();
        } else {
          props.toastRef.current.addToast({
            index: Math.random().toString(36).substring(2, 9),
            textContent: dict.performanceManagement.columnFrozenSuccessfully,
            type: "SUCCESS",
            title: dict.dataSaved,
          });

          let oldArray: any = [...props.columnsInfo];
          oldArray[props.details.index].status = "DONE";

          props.toggleColumnsInfo([...oldArray]);
          props.onClose();
        }
      })
      .catch(() => {
        props.toastRef.current.addToast({
          index: Math.random().toString(36).substring(2, 9),
          textContent: dict.performanceManagement.columnFrozenError,
          type: "ERROR",
          title: "Oops !",
        });
        props.onClose();
      });
  };

  const currentMonth = () =>
    generateFrMonthPreposition(locale, dict.months[props.details.month - 1]);

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      width={600}
      title={
        dict.performanceManagement.modalTitle +
        " " +
        currentMonth() +
        dict.months[props.details.month - 1]
      }
      subtitle={
        dict.performanceManagement.modalSubtitleFirstPart +
        currentMonth() +
        dict.months[props.details.month - 1] +
        " " +
        props.details.year +
        " " +
        dict.performanceManagement.modalSubtitleSecondPart
      }
      class={"mb-[33px] text-[20px] text-center"}
      subtitleClass={"text-center md:px-0"}
      noClosingIcon={true}
    >
      <div className="flex items-center justify-center mt-5">
        <Button
          label={dict.cancel}
          onClick={props.onClose}
          buttonWidth={200}
          type="secondary"
          iconCustomClass="mr-3 text-sm"
          icon="rs-cross"
          addClassName="mr-5"
        />
        <Button
          label={dict.lock}
          onClick={handleFormSubmit}
          buttonWidth={200}
          iconCustomClass="mr-3 text-md"
          icon="rs-lock"
        />
      </div>
    </Modal>
  );
};
