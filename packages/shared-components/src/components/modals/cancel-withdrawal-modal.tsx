import { Button } from "@shared-components/buttons";
import { useLanguageDictionary } from "@shared-hooks";
import { WithdrawalDto } from "@shared-types";
import { Modal } from "./modal";
interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  icon?: boolean;
  class?: string;
  onSubmit: (id: string) => void;
  showToast?: (
    type: "SUCCESS" | "ERROR" | "WARNING" | "INFO",
    title: string,
    textContent: string
  ) => void;
  withdrawal: WithdrawalDto;
}

const DeleteWithdrawalModal = (props: ModalProps) => {
  const dict = useLanguageDictionary();

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      title={dict.withdrawal.deleteModal.title}
      sizeTitle="[30px] text-center"
      width={600}
    >
      <div className="grid grid-cols-12 gap-x-4 justify-center space text-md">
        <div className="col-span-12 text-center mb-12">
          {dict.withdrawal.deleteModal.ifYouConfirm}{" "}
          {props.withdrawal.netRequestedAmount / 100}${" "}
          {dict.withdrawal.deleteModal.willBeDeleted}
        </div>
        <div className="col-span-12">
          <div className="flex items-center justify-center space-x-7">
            <Button
              label={dict.withdrawal.deleteModal.return}
              type="secondary"
              onClick={() => props.onClose}
              buttonWidth={200}
            />
            <Button
              label={dict.withdrawal.deleteModal.deleteWithdrawal}
              type="primary"
              onClick={() => props.onSubmit(props.withdrawal.publicId)}
              buttonWidth={200}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteWithdrawalModal;
