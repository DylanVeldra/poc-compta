import { useEffect, useState } from "react";
import { Icon } from "@shared-components/icon";

interface ShowPasswordProps {
  toggleInputType: (v: boolean) => void;
}

const ShowPassword = ({ toggleInputType }: ShowPasswordProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    toggleInputType(show);
  }, [show, toggleInputType]);

  return (
    <div className="absolute bottom-4 right-4 cursor-pointer z-50" onClick={() => setShow(!show)}>
      <Icon src={show ? "rs-crossed-eye" : "rs-eye"} />
    </div>
  );
};

export default ShowPassword;
