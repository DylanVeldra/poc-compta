import { Feature } from "components/homepage";
import Image from "next/image";
import { useLanguageDictionary } from "@shared-hooks";
import { useTheme } from "next-themes";

interface FeaturesSectionProps {
  title: string;
}

const FeaturesSection = (props: FeaturesSectionProps) => {
  const dict = useLanguageDictionary();
  const { theme } = useTheme();

  return (
    <div className="flex flex-col text-fake-black dark:text-white mb-[70px] sm:mb-[120px] lg:mb-[170px]">
      <h1 className="text-center text-[36px] sm:text-[46px] leding-[30px] sm:leading-[60px] font-semibold">
        {props.title}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[100px] mt-[50px] sm:mt-[100px] h-auto">
        <div className="block mx-auto flex w-full mb-[70px] md:mb-[100px] lg:mb-0 lg:-mt-[24px] h-[200px] sm:h-[300px] md:h-[350px] lg:h-[380px] xl:h-[450px] relative ">
          <Image
            className="shadow-light dark:shadow-dark"
            src={`${
              theme === "dark"
                ? "/images/dashboard.png"
                : "/images/dashboard-light.png"
            }`}
            layout="fill"
            objectFit="contain"
            alt="dashboard"
          />
        </div>
        <div className="flex flex-col mt-[20px] lg:mt-0">
          <Feature
            imageSrc="/images/pink-charts.png"
            title={dict.homepage.features.firstFeatureTitle}
            subtitle={dict.homepage.features.firstFeatureSubtitle}
            marginBottom={50}
          />
          <Feature
            imageSrc="/images/bitcoin.png"
            title={dict.homepage.features.secondFeatureTitle}
            subtitle={dict.homepage.features.secondFeatureSubtitle}
            marginBottom={50}
          />
          <Feature
            imageSrc="/images/white-stars.png"
            title={dict.homepage.features.thirdFeatureTitle}
            subtitle={dict.homepage.features.thirdFeatureSubtitle}
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
