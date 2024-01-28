interface ChipProps
{
  step: number;
  type?: "primary"|"secondary";
}

export default function Chip(props: ChipProps)
{
  const secondaryStyle = "text-gold border-2 border-gold";
  const primaryStyle = "text-white dark:text-fake-black bg-gold";
  const style = props.type === "secondary" ? secondaryStyle : primaryStyle;

  return (
    <div className={`${style} flex justify-center items-center rounded-full min-w-[40px] w-10 h-10 mr-5`}>
      {props.step}
    </div>
  );
}