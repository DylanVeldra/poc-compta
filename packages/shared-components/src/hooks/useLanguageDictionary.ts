import { useRouter } from "next/router"
import fr from "../locales/fr.json"
import en from "../locales/en.json"

let dicts = { fr, en }

export default function useLanguageDictionary() {
  const { locale } = useRouter() || { locale: "fr" }
  return dicts[locale as "fr" | "en"]
}
