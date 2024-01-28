import { useEffect, useState } from 'react';
import DropList from './drop-list';

interface RangeDropListProps {
  min: number;
  max: number;
  reverse?: boolean;
  defaultValue?: number;
  onChange: (v: number) => void;
  currentValue?: number;
  disabled?: boolean;
  placeholder?: string;
  errors: any;
  name: string;
}
export default function RangeDropList(props: RangeDropListProps) {
  const formatNumber = (value?: number): string | undefined => {
    if (!value) {
      return undefined;
    }
    return value < 10 ? '0' + value.toString() : value.toString();
  };

  const [range, setRange] = useState<{ value: string }[]>([]);
  const [currentValue, setCurrentValue] = useState<string | undefined>(
    undefined,
  );
  const [defaultValue, setDefaultValue] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    const array: { value: string }[] = [];
    for (let i = props.min; i <= props.max; i++) {
      array.push({ value: formatNumber(i) as string });
    }
    if (props.reverse) {
      array.reverse();
    }

    setDefaultValue(formatNumber(props.defaultValue));
    setCurrentValue(formatNumber(props.currentValue));
    setRange(array);
  }, [props.min, props.max]);

  return (
    <DropList
      name={props.name}
      list={range}
      defaultValue={defaultValue}
      onChange={(v) => props.onChange(parseInt(v))}
      currentValue={currentValue}
      disabled={props.disabled}
      placeholder={props.placeholder}
      errors={props.errors}
    />
  );
}
