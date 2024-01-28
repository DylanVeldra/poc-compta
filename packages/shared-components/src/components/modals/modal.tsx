import { ReactNode, useState } from 'react';
import { Title } from '../title';
import { Icon } from '@shared-components/icon';
import { motion } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title?: ReactNode | string;
  sizeTitle?: string;
  subtitle?: ReactNode | string;
  children?: ReactNode;
  icon?: boolean;
  class?: string;
  subtitleClass?: string;
  width?: number;
  paddingY?: string;
  noClosingIcon?: boolean;
  illustration?: boolean;
  illustrationSrc?: string;
  clickOutsideModal?: boolean;
}

export function Modal(props: ModalProps) {
  if (!props.isOpen) return <></>;
  const [init, setInit] = useState(600);
  const [final, setFinal] = useState(0);

  return (
    <div
      onClick={props.clickOutsideModal !== false ? props.onClose : undefined}
      className={`bg-black bg-opacity-60 overflow-x-hidden fixed top-0 right-0 left-0 z-40 md:inset-0 h-modal w-full h-full flex justify-center md:items-center
      `}
    >
      <motion.div
        initial={{ y: init }}
        animate={{ y: final }}
        transition={{ duration: 0.3 }}
        className="flex flex-col md:flex-row justify-end md:justify-center w-full"
      >
        {!props.noClosingIcon && (
          <div
            onClick={() => {
              setInit(0);
              setFinal(600);
              setTimeout(() => props.onClose!(), 350);
            }}
            className="md:hidden w-full flex items-center justify-center mb-[30px] mt-[30px]"
          >
            <Icon
              src="rs-cross"
              className="text-md cursor-pointer flex items-center justify-center text-black dark:text-white bg-dark-gray w-[46px] h-[46px] rounded-full"
            />
          </div>
        )}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`md:border-[1px] md:border-gold rounded-sm mx-auto pt-[30px] pb-[60px] md:py-[50px] px-6 md:px-[50px] bg-fake-white
         dark:bg-fake-black text-fake-black dark:text-white w-full md:w-9/12 lg:6/12 rounded-t-[25px] md:rounded-t-[0px]
         relative overflow-y-auto ${
           props.paddingY ? props.paddingY : 'md:py-[50px]'
         }`}
          style={{ maxWidth: props.width ? props.width + 'px' : '700px' }}
        >
          {props.illustration && (
            <div className="w-100 flex items-center justify-center mb-[30px]">
              <img src={props.illustrationSrc} />
            </div>
          )}
          {props.icon && (
            <div className="text-center px-4 py-2 bg-gold w-12 h-12 relative rounded-full mx-auto mb-[40px]">
              <Icon
                src="rs-check"
                className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-black dark:text-white"
              />
            </div>
          )}
          {!props.noClosingIcon && (
            <div onClick={props.onClose} className="hidden md:block">
              <Icon
                src="rs-cross"
                className="absolute right-6 top-6 cursor-pointer text-black dark:text-white"
              />
            </div>
          )}
          <div
            className={`md:pb-[50px] md:px-0 items-center flex flex-col ${
              props.icon ? 'text-center' : ''
            }`}
          >
            <Title
              class={props.class}
              subtitleClass={props.subtitleClass}
              title={props.title || ''}
              subtitle={props.subtitle}
              size={props.sizeTitle}
            />
          </div>
          <div>
            <>{props.children}</>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
