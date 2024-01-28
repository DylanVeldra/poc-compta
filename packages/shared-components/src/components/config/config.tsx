import { DarkmodeButton } from "@shared-components/darkmode-button";
import { LanguageSwitcher } from "@shared-components/language-switcher";

export default function Config() {
  return (
    <div className="flex items-center">
      <DarkmodeButton />
      <div className="mx-4 mb-1">|</div>
      <LanguageSwitcher />
    </div>
  );
}
