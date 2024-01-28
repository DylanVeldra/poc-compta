interface RoundLoaderProps {
  width: number;
  height: number;
  color?: string;
  customClass?: string;
}

const RoundLoader = (props: RoundLoaderProps) => {
  return (
    <svg
      className={`border-t-transparent dark:border-t-transparent border-2
                    h-${props.height} w-${props.width}  border-${props.color ? props.color : "white"}
                    rounded-full animate-spin ease duration-300
                    ${props.customClass ? props.customClass : ""}
                    `}
      viewBox="0 0 24 24"
    ></svg>
  );
};

export default RoundLoader;
