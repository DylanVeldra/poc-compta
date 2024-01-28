import { useEffect, useState } from "react";
import { Button } from "@shared-components/buttons";

interface PaginationProps {
  length: number;
  displayQuantity: number;
  onCurrentChange: (current: number) => void;
}
export default function Pagination(props: PaginationProps) {
  const [current, setCurrent] = useState(1);
  const centered =
    "text-md w-[34px] h-[34px] flex justify-center items-center hover:dark:bg-dark-gray-dimmed cursor-pointer rounded-sm";
  const button = `text-black dark:text-white bg-white dark:bg-dark-gray ${centered}`;

  useEffect(() => {
    props.onCurrentChange(current);
  }, [current]);
  useEffect(() => {
    setCurrent(1);
    props.onCurrentChange(1);
  }, [props.length, setCurrent]);

  const updateCurrent = (n: number) => {
    if (n < 1 || n > props.length) return;
    setCurrent(n);
  };
  const generateDisplayedNumbers = () => {
    const lowerBound = ~~(props.displayQuantity / 2);
    const upperBound = props.length - props.displayQuantity + 1;
    const position = Math.max(1, Math.min(current - lowerBound, upperBound));
    const output = Array.from({ length: props.displayQuantity }).map(
      (_, index) => index + position
    );

    if (props.length <= props.displayQuantity) {
      return Array.from({ length: props.length }).map((_, index) => index + 1);
    }
    if (position < upperBound) {
      output.push(...[-1, props.length]);
    }
    if (position >= lowerBound) {
      output.unshift(...[1, -1]);
    }
    return output;
  };
  const NumberElement = (value: number, index: number) => {
    return (
      <div
        key={index}
        className={value === current ? button : centered}
        onClick={() => updateCurrent(value)}
      >
        {value < 0 ? "..." : value}
      </div>
    );
  };

  return (
    <div className="flex justify-between mt-[30px]">
      <div className="w-[36px]">
        <Button
          icon="rs-angle-left"
          size="md"
          type="icon"
          disabled={current === 1}
          onClick={() => updateCurrent(current - 1)}
        />
      </div>
      <div className="flex">
        {generateDisplayedNumbers().map(NumberElement)}
      </div>
      <div className="w-[36px]">
        <Button
          icon="rs-angle-right"
          size="md"
          type="icon"
          disabled={current === props.length}
          onClick={() => updateCurrent(current + 1)}
        />
      </div>
    </div>
  );
}
