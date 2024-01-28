import Image from "next/image";

interface FeatureBoxProps {
  imageSrc: string;
  title: string;
  subtitle: string;
}

const FeatureBox = (props: FeatureBoxProps) => {
  return (
    <div className="flex flex-col mx-auto w-full sm:w-[400px] lg:w-full max-w-[400px] dark:bg-dark-gray bg-white rounded-sm shadow-light dark:shadow-dark text-fake-black dark:text-white py-[40px] px-[40px]">
      <div className="mb-[15px] flex items-start justify-start w-[100px] h-[100px] relative">
        <Image
          src={props.imageSrc}
          layout="fill"
          objectFit="contain"
          alt="feature-box"
        />
      </div>
      <h3 className="text-2xl font-light font-semibold mt-[11px] mb-[20px]">
        {props.title}
      </h3>
      <p className="text-lg font-light">{props.subtitle}</p>
    </div>
  );
};

export default FeatureBox;
