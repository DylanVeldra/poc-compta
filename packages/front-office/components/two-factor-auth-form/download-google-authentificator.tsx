import Image from "next/image";
import { useLanguageDictionary } from "@shared-hooks";
import { useRouter } from "next/router";

export default function DownloadGoogleAuthentificator() {
  const { locale } = useRouter();
  const dict = useLanguageDictionary();

  return (
    <>
      <div className="w-12 h-12 relative mr-4 hidden xl:flex items-center justify-center">
        <Image
          src="/images/google-authentificator-icon.png"
          alt="Google Authentificator icon"
          width={100}
          height={100}
        />
      </div>
      {locale === "en" ? (
        <div className="flex items-center">
          <a
            className="flex items-center mr-1.5"
            href="https://apps.apple.com/fr/app/google-authenticator/id388497605"
            target="_blank" rel="noopener noreferrer"
          >
            <Image
              src="/images/play-store-download-en.png"
              alt={dict["2fa"].downloadApp}
              width={140}
              height={50}
            />
          </a>
          <a
            className=" flex items-center"
            href="https://apps.apple.com/fr/app/google-authenticator/id388497605"
            target="_blank" rel="noopener noreferrer"
          >
            <Image
              src="/images/apple-store-download-en.png"
              alt={dict["2fa"].downloadApp}
              width={140}
              height={50}
            />
          </a>
        </div>
      ) : (
        <div className="flex items-center">
          <a
            className="mr-1.5 flex items-center"
            href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
            target="_blank" rel="noopener noreferrer"
          >
            <Image
              src="/images/play-store-download-fr.png"
              alt={dict["2fa"].downloadApp}
              width={140}
              height={50}
            />
          </a>
          <a
            className=" flex items-center"
            href="https://apps.apple.com/en/app/google-authenticator/id388497605"
            target="_blank" rel="noopener noreferrer"
          >
            <Image
              src="/images/apple-store-download-fr.png"
              alt={dict["2fa"].downloadApp}
              width={140}
              height={50}
            />
          </a>
        </div>
      )}
    </>
  );
}
