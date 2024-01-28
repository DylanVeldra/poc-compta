import { useLanguageDictionary } from '@shared-hooks';
import { Icon } from '@shared-components/icon';
import { Divider } from '@shared-components/divider';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  DepositDto,
  FeesDto,
  FinancialOperationDto,
  WithdrawalDto,
} from '@shared-types';
import { DepositDetailed, FeesDetailed } from '@shared-components/transactions';
import { fetchJSON } from '@shared-utils';
import { WithdrawalDetailed } from './withdrawal-detailed';

type TransactionSidePanelProps = {
  operation: Partial<FinancialOperationDto> | null;
  onClose: () => void;
};

export function TransactionSidePanel(props: TransactionSidePanelProps) {
  const dict = useLanguageDictionary();
  const [animationStart, setAnimationStart] = useState(692);
  const [animationOffset, setAnimationOffset] = useState(0);

  const [deposit, setDeposit] = useState<DepositDto | null>(null);
  const [withdrawal, setWithdrawal] = useState<WithdrawalDto | null>(null);
  const [fee, setFee] = useState<FeesDto | null>(null);

  const handleClose = () => {
    setAnimationStart(0);
    setAnimationOffset(692);
    setTimeout(() => {
      props.onClose();
      setAnimationStart(692);
      setAnimationOffset(0);
      setDeposit(null);
      setWithdrawal(null);
      setFee(null);
    }, 500);
  };

  useEffect(() => {
    if (!props.operation) {
      return;
    } else if (props.operation.operation === 'fees') {
      fetchJSON(`/transaction/fee/${props.operation.publicId}`)
        .then((json) => {
          setFee(json.body);
        })
        .catch(console.error);
    } else if (props.operation.operation === 'deposit') {
      fetchJSON(`/transaction/deposit/${props.operation.publicId}`)
        .then((json) => {
          setDeposit(json.body);
        })
        .catch(console.error);
    } else if (props.operation.operation === 'withdrawal') {
      fetchJSON(`/transaction/withdrawal/${props.operation.publicId}`)
        .then((json) => {
          setWithdrawal(json.body);
        })
        .catch(console.error);
    }
  }, [props.operation]);

  return (
    <>
      {props.operation ? (
        <>
          <div
            onClick={handleClose}
            className="bg-black bg-opacity-60 fixed top-0 right-0 left-0 z-40 md:inset-0 h-modal w-full h-full"
          ></div>
          <motion.div
            initial={{ x: animationStart }}
            animate={{ x: animationOffset }}
            transition={{ duration: 0.5 }}
            className="flex flex-col bg-fake-white dark:bg-fake-black fixed right-0 top-0 bottom-0 z-50 w-full sm:w-2/3 lg:w-2/5"
          >
            <div className="px-[30px] bg-white dark:bg-dark-gray flex items-center h-[82px]">
              <div className="text-lg font-semibold flex-1">
                {dict.history.operationDetail}
              </div>
              <div onClick={handleClose} className="cursor-pointer">
                <Icon className="text-2xl" src="bs-cross" />
              </div>
            </div>
            <Divider className="bg-gradient-to-r from-gold h-[2px]" />
            <div className="px-[30px]">
              {deposit ? (
                <DepositDetailed deposit={deposit} onClose={props.onClose} />
              ) : (
                <></>
              )}
              {withdrawal ? (
                <WithdrawalDetailed
                  withdrawal={withdrawal}
                  onClose={props.onClose}
                />
              ) : (
                <></>
              )}
              {fee ? (
                <FeesDetailed fees={fee} onClose={props.onClose} />
              ) : (
                <></>
              )}
            </div>
          </motion.div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
