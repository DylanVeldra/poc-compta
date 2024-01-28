import { useLanguageDictionary } from "@shared-hooks";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";

const GenerateRequestStatus = (status: "Email" | "2FA" | "Validation") => {
  const dict = useLanguageDictionary() as any;
  const { theme } = useTheme();

  const statusAttributes = {
    Email: {
      text: "1",
      textColor: "red",
      imageSrc: `/images/${theme === "dark" ? "Step number.svg" : "Step number light 1.svg"}`,
    },
    "2FA": {
      text: "2",
      textColor: "orange opacity-80",
      imageSrc: `/images/${theme === "dark" ? "Step number 2.svg" : "Step number light 2.svg"}`,
    },
    Validation: {
      text: "3",
      textColor: "green",
      imageSrc: `/images/${theme === "dark" ? "Step number 3.svg" : "Step number light 3.svg"}`,
    },
  };

  return (
    <div className="flex items-center">
      <div className={`mr-4 relative`}>
        <Image width={40} height={40} src={statusAttributes[status].imageSrc} />
      </div>
      <div className={`text-${statusAttributes[status].textColor}`}>{dict.registrationManagement[status]}</div>
    </div>
  );
};

export default GenerateRequestStatus;
