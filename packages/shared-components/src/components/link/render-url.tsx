import Link from "next/link";

export default function RenderUrl(props: { url: string; sentence: string }) {
  return (
    <Link href={props.url}>
      <a className={"underline"} target="_blank" rel="noopener noreferrer">
        {props.sentence}
      </a>
    </Link>
  );
}
