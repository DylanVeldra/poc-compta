interface DividerProps
{
  className?: string;
}

export default function (props: DividerProps)
{
  return (
    <div className={`bg-gradient-to-r from-gold rounded-full w-full h-[2px] ${props.className ?? ''}`}></div>
  );
}