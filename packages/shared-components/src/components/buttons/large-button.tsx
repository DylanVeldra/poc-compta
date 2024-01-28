interface LargeButtonProps
{
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "primary"|"secondary";
}

export default function LargeButton(props: LargeButtonProps)
{
  const secondaryStyle = "text-gold border-2 border-gold disabled:border-light-gray dark:disabled:border-gray disabled:text-light-gray dark:disabled:text-gray hover:opacity-80";
  const primaryStyle = "text-white dark:text-fake-black bg-gold disabled:bg-light-gray dark:disabled:bg-gray hover:opacity-80";
  const style = props.type === "secondary" ? secondaryStyle : primaryStyle;

  return (
    <button
      className={`${style} font-semibold focus:ring-4 focus:outline-none focus:ring-green w-[223px] h-[46px] rounded-sm px-5 py-2.5 text-center cursor-pointer disabled:cursor-not-allowed`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.label}
    </button>
  );
}