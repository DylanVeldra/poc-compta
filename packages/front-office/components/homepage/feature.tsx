import Image from "next/image";

interface FeatureProps {
  imageSrc: string;
  title: string;
  subtitle: string;
  marginBottom?: number;
}

const Feature = (props: FeatureProps) => {
  return (
    <div
      className={`flex flex-col ${
        props.marginBottom
          ? `mb-[${props.marginBottom}px] md:mb-[${props.marginBottom + 25}px]`
          : ""
      }`}
    >
      <div className="flex flex-col sm:flex-row mb-[20px] justify-center items-center lg:justify-start">
        <Image width={35} height={35} src={props.imageSrc} />
        <h3 className="text-fake-black dark:text-white text-2xl font-semibold mt-4 sm:mt-0 ml:0 sm:ml-[26px]">
          {props.title}
        </h3>
      </div>
      <div>
        <p className="text-fake-black dark:text-white font-light text-lg font-normal text-center lg:text-left">
          {props.subtitle}
        </p>
      </div>
    </div>
  );
};

export default Feature;
