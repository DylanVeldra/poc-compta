import { Icon } from "@shared-components/icon";
import { useLanguageDictionary } from "@shared-hooks";
import Link from "next/link";

interface AnyQuestionProps {
  text: string;
}
export default function AnyQuestion(props: AnyQuestionProps) {
  const dict = useLanguageDictionary();

  return (
    <div className="w-full md:w-[220px] rounded-md px-5 py-2 md:py-7 shadow-light dark:shadow-dark mb-[18px]">
      <p className="font-semibold flex items-center">
        <Icon src="rs-interrogation" className="pr-2.5" />{" "}
        {dict.deposit.anyQuestion}
      </p>
      <Link href="/">
        <a className="text-gray underline text-sm">{props.text}</a>
      </Link>
    </div>
  );
}
