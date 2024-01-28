import { FeatureBox } from "components/homepage";
import { useLanguageDictionary } from "@shared-hooks";

interface AdvantagesSectionProps {
  title: string;
  subtitle: string;
}

const AdvantagesSection = (props: AdvantagesSectionProps) => {
  const dict = useLanguageDictionary();

  return (
    <div className="flex flex-col text-fake-black dark:text-white mb-[70px] sm:mb-[120px] lg:mb-[170px]">
      <h1 className="text-center text-[36px] sm:text-[46px] leding-[30px] sm:leading-[60px] font-semibold">
        {props.title}
      </h1>
      <h6 className="mt-[22px] text-lg font-light text-fake-black dark:text-white text-center ">
        {props.subtitle}
      </h6>
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-[50px] sm:mt-[100px] h-auto gap-y-[20px] lg:gap-y-0 lg:gap-x-[20px]">
        <FeatureBox
          imageSrc="/images/security.png"
          title={dict.homepage.benefits.firstBenefitTitle}
          subtitle={`${process.env.NEXT_PUBLIC_APP_NAME} ${dict.homepage.benefits.firstBenefitSubtitle1} ${process.env.NEXT_PUBLIC_APP_NAME} ${dict.homepage.benefits.firstBenefitSubtitle2}`}
        />
        <FeatureBox
          imageSrc="/images/target.png"
          title={dict.homepage.benefits.secondBenefitTitle}
          subtitle={dict.homepage.benefits.secondBenefitSubtitle}
        />
        <FeatureBox
          imageSrc="/images/wallet-full-of-money.png"
          title={dict.homepage.benefits.thirdBenefitTitle}
          subtitle={dict.homepage.benefits.thirdBenefitSubtitle}
        />
      </div>
    </div>
  );
};

export default AdvantagesSection;
