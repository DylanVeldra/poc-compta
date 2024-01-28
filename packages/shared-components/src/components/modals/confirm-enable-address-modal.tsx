import { Button } from "@shared-components/buttons";
import { useLanguageDictionary } from "@shared-hooks";

import { AddressDto, ToastResponse } from "@shared-types";
import { formatNetwork } from "@shared-utils";
import { Modal } from "./modal";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  icon?: boolean;
  class?: string;
  onSubmit: (address: AddressDto) => void;
  showToast?: (type: ToastResponse, title: string, textContent: string) => void;
  address: AddressDto;
}

const ConfirmEnableAddressModal = (props: ModalProps) => {
  const dict = useLanguageDictionary() as any;

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      title={dict.addressModal.enableModal.title}
      width={600}
      sizeTitle="[30px] text-center"
    >
      <div className="grid grid-cols-12 gap-x-4 justify-center space text-md">
        <div className="col-span-12 text-center mb-[16px]">
          {dict.addressModal.enableModal.ifYouConfirm +
            " " +
            props.address.name +
            " " +
            dict.addressModal.enableModal.willBeActivated +
            " " +
            dict.addressModal.enableModal.youCanAlways}
        </div>
        <div className="col-span-12 text-center mb-12">
          <div className="flex flex-col text-sm">
            <span className="my-1">
              {dict.addressModal.enableModal.network} :{" "}
              {formatNetwork(props.address.protocolName)} - (
              {props.address.protocolName})
            </span>
            <span className="my-1">
              {dict.addressModal.enableModal.token} : {props.address.token}
            </span>
          </div>
        </div>
        <div className="col-span-12">
          <div className="flex items-center justify-center space-x-7">
            <Button
              label={dict.addressModal.enableModal.buttonCancel}
              type="secondary"
              onClick={props.onClose}
              buttonWidth={200}
            />
            <Button
              label={dict.addressModal.enableModal.buttonEnable}
              type="primary"
              onClick={() => props.onSubmit(props.address)}
              buttonWidth={200}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmEnableAddressModal;
