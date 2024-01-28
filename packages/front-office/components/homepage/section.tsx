import { Button } from "@shared-components/buttons";
import Image from "next/image";
import { useRouter } from "next/router";

interface SectionProps {
  title: string;
  subtitle: string;
  buttonContent: string;
  buttonLink: string;
  imageSrc: string;
}

const Section = (props: SectionProps) => {
  const router = useRouter();

  return (
    <div className="w-full mt-[50px] sm:mt-[120px] mb-[70px] sm:mb-[100px] md:mb-[150px] grid grid-cols-5 gap-x-[53px] content-center">
      <div className="flex flex-col items-start md:items-center justify-start md:justify-center col-span-5 md:col-span-3">
        <h2 className="text-fake-black dark:text-white font-semibold text-left md:text-center md:text-left text-[36px] sm:text-[46px] leding-[30px] sm:leading-[60px]">
          {props.title}
        </h2>
        <h6 className="mt-[22px] text-lg text-fake-black dark:text-white font-light text-left md:text-center sm:text-left">
          {props.subtitle}
        </h6>
        <div className="flex items-start md:items-center justify-start mt-[40px]">
          <Button
            type="primary"
            buttonWidth={200}
            label={props.buttonContent}
            onClick={() => router.push(props.buttonLink)}
            textSize="[16px]"
          />
        </div>
      </div>
      <div
        className="mt-[50px] md:mt-0 col-span-5 md:col-span-2 mx-auto flex items-center justify-center 
      w-[200px] sm:w-[300px] md:w-[300px] lg:w-[380px] xl:w-[450px] h-[200px] sm:h-[300px] md:h-[300px] lg:h-[380px] xl:h-[450px] relative"
      >
        <Image
          src={props.imageSrc}
          layout="fill"
          objectFit="contain"
          alt="image-section"
        />
      </div>
    </div>
  );
};

export default Section;
