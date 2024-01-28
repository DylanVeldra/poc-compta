import Link from "next/link";
import { useRouter } from "next/router";
import { Flag } from "../flag";

const LanguageSwitcher = () => {
  const { asPath, locale } = useRouter();

  // largeur à 21.666 pour obtenir une hauteur de 15.999 et être proche du 16px du figma 
  return (
    <>
      {locale === "en" ? (
        <Link href={asPath} locale="fr">
          <a className=""><Flag countryCode="fr"/></a>
        </Link>
      ) : (
        <Link href={asPath} locale="en">
          <a className=""><Flag countryCode="gb"/></a>
        </Link>
      )}
    </>
  );
};

export default LanguageSwitcher;