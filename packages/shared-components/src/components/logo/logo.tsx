import Image from 'next/image';

interface LogoProps {
  src: string;
  width?: number;
  height?: number;
  class?: string;
  autoWidth?: boolean;
}
export default function Logo(props: LogoProps) {
  return (
    <Image
      src={props.src}
      width={props.width ?? 32}
      height={props.height ?? 32}
      className={props.class && props.class}
    />
  );
}
