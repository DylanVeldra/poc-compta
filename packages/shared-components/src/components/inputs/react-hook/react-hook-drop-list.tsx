import { useState, ReactNode, useEffect, useRef, MouseEvent } from "react";
import { Icon } from "@shared-components/icon";
import { useLanguageDictionary } from "@shared-hooks";
import { FieldValues, Path } from "react-hook-form";

interface Item {
  label?: string | ReactNode;
  value: unknown;
}
interface ReactHookDropListProps <T extends FieldValues>{
  label?: string;
  readonly name: Path<T>;

  list: Item[];
  defaultValue?: string;

  currentValue?: unknown;
  updateForm: (key: Path<T>, value: unknown) => void;
  disabled?: boolean;
  marginTop?: number;
  placeholder?: string;
  secondPlaceholder?: string;
  errors?: any;
  searchInput?: boolean;
  filterKey?: string;
  customSize?: string;
  customBackground?: string;
  secondaryView?: boolean;
}

export default function ReactHookDropList<T extends FieldValues>(props: ReactHookDropListProps<T>) {
  const wrapperRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [selected, setSelected] = useState<Item>({value: undefined});
  const [isActivated, setIsActivated] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const dict = useLanguageDictionary();
  const filter = props.filterKey || "";

  useEffect(() => {
    if (props.currentValue !== undefined) {
      props.list.forEach((item) => {
        if (item.value === props.currentValue) {
          setSelected(item);
        }
      });
    } else {
      props.updateForm(props.name, selected.value);
    }
    setIsActivated(() => false);
  }, [props.currentValue, setIsActivated, setSelected]);

  const onChange = (v: Item) => {
    setSelected(v);
    setIsActivated(() => false);
    props.updateForm(props.name, selected.value);
  };

  const getTitle = (value: string) => {
    const item = props.list.find((item) => item.value === value);
    return item?.label ?? item?.value;
  };

  const useOutsideAlerter = (wrapperRef: any) => {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent<HTMLButtonElement>) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          setIsActivated(() => false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", (e: any) => handleClickOutside(e));
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", (e: any) =>
          handleClickOutside(e)
        );
      };
    }, [wrapperRef]);
  };

  const Elements = () => {
    useOutsideAlerter(wrapperRef);
    return (
      <ul
        className={`${
          isActivated ? "absolute" : "hidden"
        } z-20 bg-white dark:bg-dark-gray text-fake-black dark:text-white min-w-full max-h-60 overflow-y-auto rounded-sm cursor-pointer pt-2 mt-[1px] shadow-light dark:shadow-dark`}
      >
        {props.searchInput && props.filterKey && (
          <>
            <li className="block py-2 px-4 h-auto">
              <input
                className="w-full focus:outline-none bg-transparent"
                value={searchInput}
                placeholder={dict.registerFields.searchInput}
                type="search"
                autoFocus
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchInput(e.target.value)
                }
              />
            </li>
            {props.list
              .filter((element: any) =>
                element[filter]
                  .toLowerCase()
                  .includes(searchInput.toLowerCase())
              )
              .map((elem, index) => {
                return (
                  <li
                    onClick={() =>
                      !props.disabled ? onChange(elem) : undefined
                    }
                    className={`block py-2 px-4 ${
                      props.customBackground
                        ? props.customBackground
                        : "hover:bg-gold text-white"
                    } h-auto`}
                    key={index}
                  >
                    <>{elem.label || elem.value}</>
                  </li>
                );
              })}
          </>
        )}
        {!props.searchInput && (
          <>
            {props.list.map((elem, index) => {
              return (
                <li
                  onClick={() => (!props.disabled ? onChange(elem) : undefined)}
                  className={`block py-2 px-4 ${
                    props.customBackground
                      ? props.customBackground
                      : "hover:bg-gold text-white"
                  } h-auto`}
                  key={index}
                >
                  <>{elem.label || elem.value}</>
                </li>
              );
            })}
          </>
        )}
      </ul>
    );
  };

  return (
    <>
      <div
        id={props.name}
        ref={wrapperRef}
        className={`w-full relative text-md ${
          props.marginTop
            ? "mt-[" +
              props.marginTop +
              "px] sm:mt-0 md:mt-[" +
              props.marginTop +
              "px] lg:mt-0 "
            : "mb-0"
        } `}
      >
        <p className="block font-medium text-fake-black dark:text-white text-md">
          {props.label}
        </p>
        <button
          className={`w-full px-3 py-4 text-fake-black dark:text-white text-md bg-white dark:bg-dark-gray
           ${
             props.errors &&
             props.errors[props.name] &&
             "border-[2px] border-red dark:border-red"
           }
           ${
             props.customSize ? props.customSize : "h-[48px]"
           } focus:border-[2px] focus:outline-none
           focus:border-gold focus:dark:border-gold font-medium rounded-sm flex justify-between items-center mt-1 z-30`}
          type="button"
          onClick={() =>
            !props.disabled
              ? setIsActivated((isActivated) => !isActivated)
              : undefined
          }
          disabled={props.disabled}
        >
          {!props.secondaryView &&
            (!selected.value ? (
              <>
                <div className="text-gray text-sm">
                  <>{props.placeholder || getTitle(props.defaultValue!)}</>
                </div>{" "}
                {props.disabled ? <></> : <Icon src="rs-angle-down" />}
              </>
            ) : (
              <>
                <div>
                  <>
                    {isActivated && props.placeholder
                      ? props.placeholder
                      : selected.label}
                  </>
                </div>{" "}
                {props.disabled ? <></> : <Icon src="rs-angle-down" />}
              </>
            ))}
          {props.secondaryView &&
            (!selected.value ? (
              <>
                <div className="text-fake-black dark:text-white text-sm">
                  {props.placeholder || props.defaultValue}
                </div>{" "}
                <div className="flex items-center justify-center text-sm">
                  {props.secondPlaceholder}{" "}
                  <Icon src="rs-angle-down" className="ml-[20px]" />
                </div>
              </>
            ) : (
              <>
                <div className="text-fake-black dark:text-white text-sm">
                  {props.placeholder || props.defaultValue}
                </div>{" "}
                <div className="flex items-center">
                  {selected.label || selected.value}{" "}
                  {props.disabled ? (
                    <></>
                  ) : (
                    <Icon src="rs-angle-down" className="ml-[24px]" />
                  )}
                </div>
              </>
            ))}
        </button>
        {props.errors && props.errors[props.name] && (
          <span className="help-block text-dark-red text-left font-base text-sm">
            {props.errors[props.name].message}
          </span>
        )}
        <Elements />
      </div>
    </>
  );
}
