import { Button } from "@shared-components/buttons";
import { useLanguageDictionary } from "@shared-hooks";

import { AddressDto } from "@shared-types";
import { Modal } from "./modal";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  icon?: boolean;
  class?: string;
  onSubmit: (address: AddressDto) => void;
  showToast?: (
    type: "SUCCESS" | "ERROR" | "WARNING" | "INFO",
    title: string,
    textContent: string
  ) => void;
  address: AddressDto;
}

const ConfirmDeleteAddressModal = (props: ModalProps) => {
  const dict = useLanguageDictionary() as any;

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      title={dict.addressModal.deleteModal.title}
      sizeTitle="[30px] text-center"
      width={600}
    >
      <div className="grid grid-cols-12 gap-x-4 justify-center space text-md">
        <div className="col-span-12 text-center mb-12">
          {dict.addressModal.deleteModal.ifYouConfirm +
            " " +
            props.address.name +
            " " +
            dict.addressModal.deleteModal.ofNetwork +
            " " +
            props.address.protocolName +
            " " +
            dict.addressModal.deleteModal.willBeErased}
        </div>
        <div className="col-span-12">
          <div className="flex items-center justify-center space-x-7">
            <Button
              label={dict.addressModal.deleteModal.buttonCancel}
              type="secondary"
              onClick={() => props.onClose}
              buttonWidth={200}
              icon="rs-cross"
            />
            <Button
              label={dict.addressModal.deleteModal.buttonDelete}
              type="primary"
              onClick={() => props.onSubmit(props.address)}
              buttonWidth={200}
              icon="rs-trash"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteAddressModal;
