import { useProfile } from "@shared-hooks";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AppIcon() {
  const router = useRouter();
  const {user, isLoading} = useProfile(false);
  const [logoUrl, setLogoUrl] = useState("/");

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_INTERFACE === "BO") {
      setLogoUrl(() => (user?.emailLogged && user?.twoFactorLogged ? "/performance-management" : "/"));
      return;
    }

    setLogoUrl(() => (user?.emailLogged && user?.twoFactorLogged ? "/dashboard" : "/"));
  }, [user, isLoading, setLogoUrl]);

  return (
    <>
      <div className="hidden md:flex justify-center">
        <Image
          onClick={() => router.push(logoUrl)}
          className="cursor-pointer"
          src="/images/logo-2.svg"
          width={152}
          height={42}
          priority={true}
        />
      </div>
      <div className="flex justify-start md:hidden">
        <Image
          onClick={() => router.push(logoUrl)}
          className="cursor-pointer"
          src="/images/logo_mobile.svg"
          width={82}
          height={42}
          priority={true}
        />
      </div>
    </>
  );
}
