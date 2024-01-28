import Image from "next/image";
import { useRouter } from "next/router";
import { InlineButton } from "@shared-components/buttons";
import { Config } from "@shared-components/config";
import { Header } from "@shared-components/header";
import { ProtectedPagesHeader } from "@shared-components/protected-pages-header";
import { useLanguageDictionary, useProfile } from "@shared-hooks";

export default function FourOFour() {
  const [user, isLoading] = useProfile(false);
  const dict = useLanguageDictionary();
  const router = useRouter();

  return (
    <div className="w-full h-screen overflow-y-auto flex flex-col">
      {!user || isLoading ? (
        <Header config={<Config />} showRegistration={true} />
      ) : (
        <div className="p-[30px] sm:p-[46px]">
          <ProtectedPagesHeader pathname={router.pathname} title="" />
        </div>
      )}
      <div className="flex justify-center items-center mt-[205px]">
        <div className="mr-[150px]">
          <h1 className="text-[46px] text-gold">404</h1>
          <h1 className="text-[46px] mb-[20px]">{dict["404"].notFound}</h1>
          <p className="mb-[80px]">{dict["404"].pageNotFound}</p>
          <div className="w-[200px] h-[40px] flex">
            <InlineButton label={dict["404"].backToHome} onClick={() => router.push("/")} />
          </div>
        </div>
        <Image src="/images/404.svg" width={465} height={410} />
      </div>
    </div>
  );
}
