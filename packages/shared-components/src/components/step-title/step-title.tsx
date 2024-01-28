interface StepTitleProps
{
  text: string;
  step: number;
}
export default function StepTitle(props: StepTitleProps)
{
  return (<h3 className="text-[16px] font-semibold text-gold">{props.step}. {props.text}</h3>);
}