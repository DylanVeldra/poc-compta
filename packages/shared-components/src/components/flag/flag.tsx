interface FlagProps
{
  countryCode: string;
  className?: string
}

/*
 * Currently using this lib: https://flagicons.lipis.dev/
 * Images are stored locally
 * Flag are 4*3, to have a standard height same as icons we put 21.666px as width to obtain 15.999px as height
 */
export default function Flag(props: FlagProps)
{
  return (
    <img src={`/images/flags/4x3/${props.countryCode.toLowerCase()}.svg`} width={21} height={16} className={`rounded-sm border-[1px] border-fake-white dark:border-fake-black w-[21px] h-[16px] ${props.className ?? ''}`}/>
  );
}