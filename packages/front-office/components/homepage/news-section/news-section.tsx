import { useEffect, useState } from "react";
import { useLanguageDictionary } from "@shared-hooks";
import Image from "next/image";
import { Icon } from "@shared-components/icon";

// import Swiper core and required modules
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Content
import HomepageContent from "var/homepageContent";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const NewsSection = () => {
  const dict = useLanguageDictionary();
  const [swiperInstance, setSwiperInstance] = useState<any>();
  const [currIndex, setCurrIndex] = useState(0);
  const [numberOfArticles, setNumberOfArticles] = useState(0);

  useEffect(() => {
    setNumberOfArticles(() => HomepageContent.newsSectionContent.length - 2);
  }, []);

  return (
    <div className="relative flex flex-col text-fake-black dark:text-white mb-[70px] sm:mb-[120px] lg:mb-[170px]">
      <h1 className="text-center text-[36px] sm:text-[46px] leding-[30px] sm:leading-[60px] font-semibold mb-[50px] sm:mb-[100px] ">
        {dict.homepage.news}
      </h1>

      <div className="mx-auto w-[95%] relative">
        <div
          onClick={() => {
            if (swiperInstance.realIndex === 0) {
              swiperInstance.slideTo(
                HomepageContent.newsSectionContent.length - 3
              );
            } else {
              swiperInstance.slidePrev();
            }
          }}
          className="cursor-pointer bg-white dark:bg-dark-gray w-[34px] h-[34px] flex items-center justify-center rounded-sm absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2"
        >
          <Icon
            src="rs-angle-left"
            className="text-md text-fake-black dark:text-white"
          />
        </div>
        <Swiper
          // Swiper modules
          breakpoints={{
            800: { slidesPerView: 2, spaceBetween: 30 },
            1200: { slidesPerView: 3, spaceBetween: 20 },
          }}
          modules={[Navigation, Autoplay]}
          navigation={true}
          spaceBetween={0}
          slidesPerView={1}
          onSwiper={(swiper) => {
            // Set the swiper outside of its context to use its methods
            setSwiperInstance(() => swiper);
          }}
          onSlideChange={(swiper) => {
            setSwiperInstance(() => swiper);
            setCurrIndex(() => swiper.realIndex);
          }}
        >
          {HomepageContent.newsSectionContent.map((article, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-center relative mx-auto w-full sm:w-[400px] md:w-[320px] lg:w-[350px] h-[200px] sm:h-[250px] md:h-[200px] overflow-hidden">
                <Image
                  layout="fill"
                  src={article.imageSrc}
                  alt="article-image"
                />
                <div className="flex flex-col items-start absolute h-[80px] bottom-0 right-0 left-0 z-10 bg-fake-white bg-opacity-20 backdrop-blur-lg w-[calc(100%-2px)] mx-auto"></div>
                <div className="flex flex-col items-start absolute w-full h-[80px] bottom-0 right-0 left-0 z-20 px-4">
                  <p className="text-white text-center w-full mt-2">
                    {article.title}
                  </p>
                  <p className="text-white text-left truncate w-[95%] mt-2 text-sm">
                    {article.subtitle}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          onClick={() => {
            if (
              swiperInstance.realIndex ===
              HomepageContent.newsSectionContent.length - 3
            ) {
              swiperInstance.slideTo(0);
            } else {
              swiperInstance.slideNext();
            }
          }}
          className="cursor-pointer bg-white dark:bg-dark-gray w-[34px] h-[34px] flex items-center justify-center rounded-sm absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2"
        >
          <Icon
            src="rs-angle-right"
            className="text-md text-fake-black dark:text-white"
          />
        </div>
      </div>
      <div className="w-full flex justify-center mt-5">
        {new Array(numberOfArticles).fill(0).map((_, index) => (
          <div
            key={index}
            onClick={() => swiperInstance.slideTo(index)}
            className={`cursor-pointer ${
              currIndex === index
                ? "bg-gold"
                : "dark:bg-dark-gray bg-light-gray"
            } rounded-sm`}
            style={{
              width: currIndex === index ? "17px" : "8px",
              height: "8px",
              marginRight: "9px",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
