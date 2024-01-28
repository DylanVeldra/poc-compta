import { useLanguageDictionary } from "@shared-hooks";

import QRCode from 'react-qr-code'

interface ScanQRCodeProps {
  code: string;
  secret?: string;
}

export default function ScanQRCode(props: ScanQRCodeProps) {
  const dict = useLanguageDictionary();

  return (
    <div className="flex flex-col items-center">
      <div className="p-4 bg-white rounded-sm w-[200px] h-[200px] flex items-center justify-center">
        <div className="p-2 border rounded">
          <QRCode value={props.code} size={175} />
        </div>
      </div>
      <p className="font-base mt-7 text-md">{dict["2fa"].useInlineCode}</p>
      <p className="border-2 border-gold rounded-md font-medium tracking-widest py-2 px-4 text-xl m-2">
        {props.secret}
      </p>
    </div>
  );
}
