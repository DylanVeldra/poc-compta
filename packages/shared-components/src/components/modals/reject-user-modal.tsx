import { useLanguageDictionary } from "@shared-hooks";
import { UserRow } from "@shared-types";
import { Button } from "../buttons";
import { Modal } from "./modal";

interface RejectUserModalProps {
  disableButton?: boolean;
  isOpen: boolean;
  rejectedUser?: UserRow;
  onClose: () => void;
  onSubmit: (user: UserRow) => void;
}

export const RejectUserModal = (props: RejectUserModalProps) => {
  const dict = useLanguageDictionary();

  return (
    <Modal
      isOpen={props.isOpen}
      title={dict.registrationManagement.rejectUserModalTitle}
      subtitle={
        dict.registrationManagement.rejectUserModalSubtitlep1 +
        props.rejectedUser?.firstname +
        " " +
        props.rejectedUser?.lastname +
        " " +
        dict.registrationManagement.rejectUserModalSubtitlep2
      }
      class="text-center"
      subtitleClass="text-center mt-5"
      onClose={() => props.onClose()}
      width={600}
      noClosingIcon={true}
    >
      <div className="flex items-center justify-center">
        <Button
          type={"secondary"}
          label={dict.cancel}
          onClick={() => props.onClose()}
          buttonWidth={200}
        />
        <Button
          label={dict.registrationManagement.rejectUser}
          addClassName="ml-[30px]"
          onClick={() => {
            props.onSubmit(props.rejectedUser!);
            props.onClose();
          }}
          buttonWidth={200}
        />
      </div>
    </Modal>
  );
};
