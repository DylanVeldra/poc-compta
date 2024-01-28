import { Button } from '../buttons';
import { useLanguageDictionary, useInterval, useProfile } from '@shared-hooks';
import { Modal } from './modal';

interface LogoutModalProps {
  disableButton?: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const LogoutModal = (props: LogoutModalProps) => {
  const dict = useLanguageDictionary();

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      class="text-center"
      title={dict.disconnectModal.successfulDisconnection}
      width={600}
      icon
    >
      <div className="grid grid-cols-12 gap-x-4 justify-center space text-md">
        <div className="col-span-12 text-center mb-12">
          {dict.disconnectModal.youHaveBeenLogout}{' '}
          {process.env.NEXT_PUBLIC_APP_NAME}
        </div>
        <div className="col-span-12">
          <div className="flex items-center justify-center space-x-7">
            <Button
              label={dict.disconnectModal.goBackHome}
              type="primary"
              onClick={() => props.onClose()}
              buttonWidth={200}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;
