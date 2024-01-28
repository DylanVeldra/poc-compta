import { useLanguageDictionary } from "@shared-hooks";
import HomepageContent from "var/homepageContent";

const Statistics = () => {
  const dict = useLanguageDictionary();

  return (
    <div className="grid grid-cols-4 gap-x-4 w-full mb-[70px] sm:mb-[120px] lg:mb-[170px] max-w-[450px] sm:max-w-[1071px] mx-auto h-auto lg:h-[164px] divide-x-none lg:divide-x lg:divide-x-[1px] divide-gold dark:bg-dark-gray rounded-sm bg-white shadow-light dark:shadow-dark py-[31px] px-[15px] sm:px-[30px]">
      {new Array(4).fill(0).map((_, index) => (
        <div
          key={index}
          className="col-span-2 lg:col-span-1 flex items-center justify-center"
        >
          <div className={`flex flex-col my-[20px] lg:my-0`}>
            <h2 className="dark:text-gold text-gold text-center lg:text-left text-[30px] md:text-[46px] font-semibold mb-[15px]">
              {HomepageContent.statisticsContent[`statisticp${index + 1}`]}
            </h2>
            <p className="text-fake-black dark:text-white text-center text-md">
              {dict.homepage[`statisticp${index + 1}`]}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Statistics;
