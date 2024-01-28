import { Icon } from '@shared-components/icon';
import { useLanguageDictionary } from '@shared-hooks';
import {
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
  useCallback,
  useEffect,
  memo,
  useMemo,
} from 'react';
interface ToastObject {
  index: string;
  textContent: string;
  type: 'SUCCESS' | 'ERROR' | 'WARNING' | 'INFO';
  title: string;
}

// To use the toasts, create a ref in the parent element and pass it down as a props
// This way: <ToastGenerator ref={toastRef} />
// Then use ref.current + "methods name" to trigger any method from the parent element
const Toast = forwardRef((props, ref) => {
  const [displayToastsLimit, setDisplayToastLimit] = useState(5);
  const [displayToasts, setDisplayToasts] = useState<Array<ToastObject>>([]);
  const dict = useLanguageDictionary();
  let isProcessing = false;

  // These methods can be use in the parent element itself
  useImperativeHandle(ref, () => ({
    addToast: (toast: ToastObject) => {
      if (displayToasts.length >= displayToastsLimit) {
        removeFirstToast();
      }
      setDisplayToasts((displayToasts: Array<ToastObject>) => [
        ...displayToasts,
        toast,
      ]);
    },
    removeFirstToast: () => {
      let newArray = displayToasts.filter((_: any, index: number) => index > 0);
      setDisplayToasts(() => [...newArray]);
    },
    removeLastToast: () => {
      setDisplayToasts((displayToasts: Array<ToastObject>) => [
        ...displayToasts.slice(0, -1),
      ]);
    },
    removeSpecificToast: (index: string) => {
      setDisplayToasts((displayToasts: Array<ToastObject>) => {
        let elementIndex = displayToasts.findIndex(
          (object: ToastObject) => object.index === index,
        );
        let newArray = displayToasts.filter(
          (_: any, index: number) => index !== elementIndex,
        );
        return [...newArray];
      });
    },
    changeDisplayToastLimit: (newLimit: number) => {
      setDisplayToastLimit(() => newLimit);
    },
  }));

  // These functions are used locally
  const removeSpecificToast = (index: string) => {
    return setDisplayToasts((displayToasts: Array<ToastObject>) => {
      let elementIndex = displayToasts.findIndex(
        (object: ToastObject) => object.index === index,
      );
      return [
        ...displayToasts.filter(
          (_: any, index: number) => index !== elementIndex,
        ),
      ];
    });
  };

  const removeFirstToast = useCallback(() => {
    setDisplayToasts((displayToasts: Array<ToastObject>) => [
      ...displayToasts.slice(1),
    ]);
  }, []);

  const Item = memo(({ item, index }: { item: ToastObject; index: any }) => {
    let itemRef = useRef(index);

    useEffect(() => {
      if (!isProcessing) {
        isProcessing = true;

        setTimeout(() => {
          if (itemRef.current) {
            itemRef.current.classList.add('animate-fadeOut');
          }
          isProcessing = false;
        }, 4000);

        setTimeout(() => {
          if (itemRef.current) {
            itemRef.current.classList.add('hidden');
            removeSpecificToast(index);
          }
        }, 5000);
      }
    }, [isProcessing]);

    return useMemo(() => {
      return (
        <div
          key={index}
          id={index}
          ref={itemRef}
          className={`md:max-w-[450px] mt-4 md:mt-2 w-full md:w-max bg-white dark:bg-dark-gray border-2 rounded-md z-50
            ${item.type === 'SUCCESS' && 'border-green'}
            ${item.type === 'WARNING' && ''}
            ${item.type === 'ERROR' && 'border-red'}
            ${item.type === 'INFO' && ''}
          `}
        >
          <div className={`flex items-center px-[16px] py-[14px]`}>
            <div
              className={`flex items-center justify-center border-2 rounded-full min-w-[20px] min-h-[20px]
              ${item.type === 'SUCCESS' && 'text-green'}
              ${item.type === 'WARNING' && ''}
              ${item.type === 'ERROR' && 'text-red'}
              ${item.type === 'INFO' && ''}
            `}
            >
              {item.type === 'SUCCESS' && (
                <Icon
                  src="rs-check"
                  className="border-green text-green text-[10px]"
                />
              )}
              {item.type === 'WARNING' && (
                <Icon src="rs-check" className="text-red text-[10px]" />
              )}
              {item.type === 'ERROR' && (
                <Icon
                  src="rs-cross"
                  className="border-red text-red text-[10px]"
                />
              )}
              {item.type === 'INFO' && (
                <Icon src="rs-check" className="text-green text-[10px]" />
              )}
            </div>
            <div className="flex flex-col px-[16px] w-full">
              <h5 className="text-[16px]">{item.title}</h5>
              <div className="text-sm">
                {item.textContent}
                {item.type === 'ERROR' && (
                  <>
                    <span> {dict.defaultToastErrors[0]}</span>
                    <a href="mailto:support@eovo.group">
                      <u>{dict.defaultToastErrors[1]}</u>
                    </a>
                    {dict.defaultToastErrors[2]}
                  </>
                )}
              </div>
            </div>
            <span onClick={() => removeSpecificToast(item.index)}>
              <Icon
                src="rs-cross"
                className="cursor-pointer text-black dark:text-white"
              />
            </span>
          </div>
        </div>
      );
    }, []);
  });

  return (
    <>
      {!!displayToasts.length && (
        <div className="md:max-w-[450px] w-auto h-auto max-h-[320px] absolute md:fixed top-[-10px] md:top-[29px] md:right-[25px] z-50 flex flex-col items-end ease-in-out duration-300 transition-all">
          {displayToasts.map((item: ToastObject) => (
            <Item item={item} index={item.index} key={item.index} />
          ))}
        </div>
      )}
    </>
  );
});

export default Toast;
