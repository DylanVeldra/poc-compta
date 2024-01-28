import { useEffect, useState } from 'react';
import RangeDropList from './range-drop-list';
import { InputContainer } from '../input-container';
import { useLanguageDictionary } from '@shared-hooks';

interface DatePickerProps {
  label?: string;
  onChange?: (v: Date) => void;
  updateForm?: (v: string, x: number) => void;
  currentBirthDate?: Date;
  disabled?: boolean;
  values?: {
    [key: string]: string | boolean;
  };
  errors?: any;
  handleChange?: (v: string) => void;
  hideLegal?: boolean;
}
export default function DatePicker(props: DatePickerProps) {
  const dict = useLanguageDictionary();
  const now = new Date();
  const [day, setDay] = useState(props.currentBirthDate?.getDate());
  const [month, setMonth] = useState(
    props.currentBirthDate ? props.currentBirthDate.getMonth() + 1 : undefined,
  );
  const [year, setYear] = useState(props.currentBirthDate?.getFullYear());
  const [nbDays, setNbDays] = useState(
    year && month ? new Date(year, month, 0).getDate() : 31,
  );

  useEffect(() => {
    if (year && month && day) {
      props.onChange?.(new Date(year, month - 1, day));
    }
  }, [day, month, year]);

  const onChangeOnDay = (v: number) => {
    if (!Number.isInteger(v)) {
      return;
    }
    setDay(v);
    if (props.updateForm) {
      props.updateForm('birthDay', v);
    }
  };

  const onChangeOnMonth = (v: number) => {
    if (!Number.isInteger(v)) {
      return;
    }
    setMonth(v);
    setNbDays(new Date(year ?? now.getFullYear(), v, 0).getDate());
    if (props.updateForm) {
      props.updateForm('birthMonth', v);
    }
  };

  const onChangeOnYear = (v: number) => {
    if (!Number.isInteger(v)) {
      return;
    }
    setYear(v);
    if (props.updateForm) {
      props.updateForm('birthYear', v);
    }
  };

  return (
    <div className="block font-medium text-fake-black dark:text-white ">
      <p className="block font-medium text-fake-black dark:text-white text-md">
        {props.label}
      </p>
      <InputContainer className="grid-cols-3 gap-x-2.5" noMargin>
        <RangeDropList
          name="birthDay"
          errors={props.errors}
          placeholder={dict.registerFields.birthDay}
          currentValue={day}
          min={1}
          max={nbDays}
          defaultValue={day}
          onChange={onChangeOnDay}
          disabled={props.disabled}
        />
        <RangeDropList
          name="birthMonth"
          errors={props.errors}
          placeholder={dict.registerFields.birthMonth}
          currentValue={month}
          min={1}
          max={12}
          defaultValue={month}
          onChange={onChangeOnMonth}
          disabled={props.disabled}
        />
        <RangeDropList
          name="birthYear"
          errors={props.errors}
          placeholder={dict.registerFields.birthYear}
          min={now.getFullYear() - 100}
          max={now.getFullYear() - 18}
          defaultValue={year}
          onChange={onChangeOnYear}
          reverse
          currentValue={year}
          disabled={props.disabled}
        />
      </InputContainer>
      {!props.hideLegal ? (
        <small className="text-sm text-gray">{dict.legal}</small>
      ) : (
        <></>
      )}
    </div>
  );
}
