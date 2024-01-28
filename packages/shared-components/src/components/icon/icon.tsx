interface IconProps {
  src: string;
  inline?: boolean;
  className?: string;
}

export default function Icon(props: IconProps) {
  return (
    <i
      className={`fi fi-${props.src} ${props.inline ? '' : 'flex'} ${
        props.className ? props.className : ''
      }`}
    ></i>
  );
}
