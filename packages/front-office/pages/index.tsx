import Head from "next/head";
import { useLanguageDictionary, useProfile } from "@shared-hooks";
import { Header } from "@shared-components/header";
import { Config } from "@shared-components/config";
import { Layout } from "@shared-components/layout";
import { useRouter } from "next/router";
import { Section, Statistics } from "components/homepage";
import { FeaturesSection } from "components//homepage/features-section";
import { AdvantagesSection } from "components//homepage/advantages-section";
import { FaqSection } from "components//homepage/faq-section";
import { Button } from "@shared-components/buttons";
import { Footer } from "components//homepage/footer";
import { NewsSection } from "components//homepage/news-section";
import LogoutModal from "@shared-components/modals/logout-modal";
import { useState } from "react";

export default function Home() {
  const dict = useLanguageDictionary();
  const {user, isLoading} = useProfile(false);
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(!!router.query.logout);

  if (
    !isLoading &&
    user &&
    user.emailLogged &&
    user.twoFactorLogged &&
    user.emailVerified &&
    user.twoFactorVerified &&
    user.exp > Date.now() / 1000
  ) {
    router.push("/dashboard");
  }

  return (
    <Layout>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <div className="flex flex-col w-screen overflow-hidden">
        <Header config={<Config />} showRegistration={true} />
        <div className="flex flex-col w-full max-w-[1350px] mx-auto px-[30px] sm:px-[20px] md:px-[40px]">
          <Section
            title={dict.homepage.pageTitle}
            subtitle={`${process.env.NEXT_PUBLIC_APP_NAME} ${dict.homepage.pageSubtitle}`}
            buttonContent={dict.homepage.buttonContent}
            buttonLink="/register"
            imageSrc="/images/homepage-top-picture.png"
          />
          <Statistics />
          <FeaturesSection title={dict.homepage.featuresTitle} />
          <AdvantagesSection
            title={dict.homepage.benefitsTitle}
            subtitle={`${process.env.NEXT_PUBLIC_APP_NAME} ${dict.homepage.benefitsSubtitle}`}
          />
          <FaqSection title={"FAQ"} />
          <NewsSection />
          <div className="flex flex-col text-fake-black dark:text-white mb-[70px] sm:mb-[120px] lg:mb-[170px]">
            <h1 className="text-center text-[36px] sm:text-[46px] leding-[30px] sm:leading-[60px] font-semibold">
              {dict.homepage.lastSectionTitle}
            </h1>
            <div className="flex items-center justify-start mt-[70px] mx-auto">
              <Button
                textSize="[16px]"
                type="primary"
                buttonWidth={200}
                label={dict.registerFields.register}
                onClick={() => router.push("/register")}
              />
            </div>
          </div>
        </div>
        <LogoutModal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
        />
        <Footer />
      </div>
    </Layout>
  );
}
