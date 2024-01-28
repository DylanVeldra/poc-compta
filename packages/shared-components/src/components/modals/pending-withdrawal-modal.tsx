import { Button } from "@shared-components/buttons";
import { useLanguageDictionary } from "@shared-hooks";
import { Modal } from "./modal";

interface PendingWithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PendingWithdrawalModal = (props: PendingWithdrawalModalProps) => {
  const dict = useLanguageDictionary();

  return (
    <Modal
      isOpen={props.isOpen}
      title={dict.withdrawal.pendingWithdrawalModal.title}
      subtitle={<div className="flex flex-col"></div>}
      class="text-center"
      subtitleClass="text-center"
      onClose={() => props.onClose()}
      width={600}
      noClosingIcon={true}
    >
      <div className="col-span-12 text-center mb-[100px]">
        {dict.withdrawal.pendingWithdrawalModal.content}
      </div>
      <div className="flex items-center justify-center">
        <Button
          type={"secondary"}
          label={dict.cancel}
          onClick={() => props.onClose()}
          buttonWidth={200}
        />
        <Button
          label={dict.withdrawal.pendingWithdrawalModal.continue}
          addClassName="ml-[30px]"
          onClick={() => {
            props.onClose();
          }}
          buttonWidth={200}
        />
      </div>
    </Modal>
  );
};
