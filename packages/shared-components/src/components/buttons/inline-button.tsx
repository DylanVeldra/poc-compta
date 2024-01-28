interface InlineButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'primary' | 'secondary';
}

export default function InlineButton(props: InlineButtonProps) {
  const secondaryStyle =
    'text-gold border-2 border-gold disabled:border-light-gray dark:disabled:border-gray disabled:text-light-gray dark:disabled:text-gray';
  const primaryStyle =
    'text-white dark:text-fake-black bg-gold disabled:bg-light-gray dark:disabled:bg-gray ';
  const style = props.type === 'secondary' ? secondaryStyle : primaryStyle;

  return (
    <button
      className={`${style} hover:opacity-80 font-semibold focus:outline-none w-full rounded-sm text-center cursor-pointer disabled:cursor-not-allowed`}
      onClick={(e) => {
        e.stopPropagation();
        props.onClick?.();
      }}
      disabled={props.disabled}
    >
      {props.label}
    </button>
  );
}
