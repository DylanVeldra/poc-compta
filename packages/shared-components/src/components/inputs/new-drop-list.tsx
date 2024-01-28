import { Icon } from '@shared-components/icon';
import { useEffect, useRef, useState } from 'react';

type Item = {
  label: string;
  value: string;
};

type NewDropListProps = {
  items: Item[];
  onChange: (value: string) => void;
};

export default function NewDropList(props: NewDropListProps) {
  const [itemSelected, setItemSelected] = useState(props.items[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [menuWidth, setMenuWidth] = useState(0);
  const wrapperRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', (e: any) =>
        handleClickOutside(e),
      );
    };
  }, [wrapperRef]);

  return (
    <div
      ref={wrapperRef}
      className={`text-sm cursor-pointer select-none ${
        isOpen ? '' : 'pl-[1px] pr-[1px]'
      }`}
    >
      <div
        ref={(dropButton) => {
          if (dropButton) {
            setMenuWidth(dropButton.offsetWidth);
          }
        }}
        onClick={() => setIsOpen(!isOpen)}
        className={`p-[14px] flex flex-col justify-center dark:bg-dark-gray bg-white h-[40px] rounded-sm ${
          isOpen
            ? 'border-2 border-gold'
            : 'border dark:border-gray border-light-gray'
        }`}
      >
        <div className="flex">
          <div>
            {props.items.find((e) => e.value === itemSelected.value)?.label}
          </div>
          <div className="flex-1" />
          <Icon src="bs-angle-down" className="ml-7 mt-[4px]" />
        </div>
      </div>
      {isOpen && (
        <div
          style={{ width: menuWidth }}
          className={`dark:bg-fake-black bg-light-gray rounded-sm dark:shadow-dark shadow-light pt-[1px] absolute z-20`}
        >
          {props.items.map((item, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === props.items.length - 1;

            let additionalClasses =
              (isFirst ? 'rounded-t-sm' : 'mt-[1px]') +
              ' ' +
              (isLast ? 'rounded-b-sm' : '');

            return (
              <div
                key={idx}
                onClick={() => {
                  setItemSelected(item);
                  setIsOpen(false);
                  props.onChange(item.value);
                }}
                className={`dark:bg-dark-gray bg-white hover:text-white h-[40px] flex flex-col justify-center p-[14px] hover:bg-gold hover:dark:bg-gold ${additionalClasses}`}
              >
                <div>{item.label}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
