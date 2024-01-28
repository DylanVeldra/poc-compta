import { ReactNode, useState } from "react";
import { Layout } from "@shared-components/layout";
import { Config } from "@shared-components/config";
import { Title } from "@shared-components/title";
import { AppIcon } from "@shared-components/app-icon";
import { MobileNavigation } from "@shared-components/mobile-navigation";
import { RegisterStep } from "@shared-components/register-steps";
import { useLanguageDictionary } from "@shared-hooks";

interface FormLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: ReactNode | string;
  marginTop?: number;
  stepMini?: ReactNode | string;
  showRegisterStepList?: number;
  class?: string;
}

export default function FormLayout(props: FormLayoutProps) {
  const [toggleMobileView, setToggleMobileView] = useState(false);

  const viewList = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-black dark:text-gray"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 10h16M4 14h16M4 18h16"
      />
    </svg>
  );

  return (
    <Layout>
      <div className="w-full h-full flex relative">
        <div className="relative hidden md:flex md:flex-col md:w-1/3 px-10 py-10 bg-white dark:bg-dark-gray items-center">
          <AppIcon />
          {props.showRegisterStepList && (
            <RegisterStep step={props.showRegisterStepList} />
          )}
        </div>
        <div className="w-full md:w-2/3 pb-20 pt-10 px-8 md:px-28">
          <div
            className="mx-auto relative md:static"
            style={{ maxWidth: "800px" }}
          >
            <div className="hidden md:block absolute top-10 right-10">
              <Config />
            </div>
            <div className="flex justify-between md:hidden">
              <AppIcon />
              <div onClick={() => setToggleMobileView(true)}>
                <>{viewList}</>
              </div>
            </div>
            <div
              className={`mb-16 relative mt-[109px] md:mt-[${
                props.marginTop ? props.marginTop + "px" : "0px"
              }]`}
            >
              <>{props.stepMini}</>
              <Title
                title={props.title}
                subtitle={props.subtitle}
                class={props.class}
                size={"3xl"}
              />
            </div>
            <>{props.children}</>
          </div>
        </div>
        {toggleMobileView && (
          <MobileNavigation setToggleMobileView={setToggleMobileView} />
        )}
      </div>
    </Layout>
  );
}
