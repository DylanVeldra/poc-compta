import { LinkButton } from "../buttons";

interface TextWithLinkProps
{
  text: string;
  link: string;
  onClick: () => void;
}

export default function TextWithLink(props: TextWithLinkProps)
{
  return (
    <div className="flex">
      <span className="mr-1">{props.text}{" "}</span>
      <LinkButton
        label={props.link}
        onClick={props.onClick}
      />
    </div>
  );
}