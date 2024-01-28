import { Button } from '@shared-components/buttons';
import { Container } from '@shared-components/container';
import { SingleLineInput } from '@shared-components/inputs';
import { useLanguageDictionary } from '@shared-hooks';
import { useState } from 'react';
import { UserRow } from '@shared-types';
import { Modal } from './modal';

interface AddUniqueDepositAddressModalProps {
  isOpen: boolean;
  acceptedUser?: UserRow;
  onClose: () => void;
  onSubmit: (user: UserRow, address: string) => void;
}

export const AddUniqueDepositAddressModal = (
  props: AddUniqueDepositAddressModalProps,
) => {
  const dict = useLanguageDictionary();
  const [uniqueAddress, setUniqueAddress] = useState('');

  return (
    <Modal
      isOpen={props.isOpen}
      title={dict.registrationManagement.addUniqueDepositAddressModal.title}
      subtitle={
        <div className="flex flex-col">
          <span>
            {
              dict.registrationManagement.addUniqueDepositAddressModal
                .addAddressToUser
            }{' '}
            {props.acceptedUser?.firstname} {props.acceptedUser?.lastname}.
          </span>
          <span>
            {
              dict.registrationManagement.addUniqueDepositAddressModal
                .thisAddressMustBeUnique
            }
          </span>
        </div>
      }
      class="text-center"
      subtitleClass="text-center mt-5"
      onClose={() => props.onClose()}
      width={600}
      noClosingIcon={true}
    >
      <div className="mb-[50px]">
        <Container noBorder>
          <SingleLineInput
            label={dict.addressModal.enableModal.address}
            name="transactionId"
            placeholder={dict.withdrawal.transactionIdExample}
            onChange={setUniqueAddress}
          />
        </Container>
      </div>
      <div className="flex items-center justify-center">
        <Button
          type={'secondary'}
          label={dict.cancel}
          onClick={() => props.onClose()}
          buttonWidth={200}
        />
        <Button
          label={
            dict.registrationManagement.addUniqueDepositAddressModal
              .validateRequest
          }
          addClassName="ml-[30px]"
          onClick={() => {
            props.onSubmit(props.acceptedUser!, uniqueAddress);
            props.onClose();
          }}
          buttonWidth={200}
        />
      </div>
    </Modal>
  );
};
