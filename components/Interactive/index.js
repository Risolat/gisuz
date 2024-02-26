import React, { useEffect, useState } from "react";
import Image from "next/image";
import service1 from "../../public/photos/icons/service1.svg";
import service2 from "../../public/photos/icons/service2.svg";
import service3 from "../../public/photos/icons/service3.svg";
import service4 from "../../public/photos/icons/service4.svg";
import openData from "../../public/photos/icons/open-data.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const Slideshow = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { t } = useTranslation("common");
  const responsive = {
    0: { items: 1 },
    850: { items: 2 },
    1160: { items: 3 },
    1360: { items: 3 },
    1450: { items: 4 },
  };
  useEffect(() => {
    setIsClient(true);
  }, []);
  const items = [
    <div
      className="block item cursor-pointer mx-[18px] h-auto"
      onClick={() => router.push("/interactive_service/open_data")}
    >
      <div className="gradientBox">
        <div className="hover:bg-[#312E6B] bg-[#3A2F7D] flex flex-col items-center px-[20px] pt-[24px] pb-[42px]">
          <div className="w-[120px] h-[120px] p-[15px] bg-[#3C3976] mb-[40px]">
            <Image src={openData} alt="service" className="w-[80px] h-[80px]" />
          </div>
          <h5 className="text-[1.25rem] h-[60px] leading-5 text-center pb-[24px]">
            {t("interactive-services.open-data")}
          </h5>
          <p className="max-w-[284px] h-[78px] text-center line-clamp-4 text-[#A2A0B3] text-[16px] leading-5">
            {t("interactive-services.open-data-text")}
          </p>
        </div>
      </div>
    </div>,

    <div
      onClick={() => router.push("/events/schedule")}
      className="block item cursor-pointer mx-[18px] h-auto"
    >
      <div className="gradientBox">
        <div className="hover:bg-[#312E6B] bg-[#3A2F7D] flex flex-col items-center px-[20px] pt-[24px] pb-[42px]">
          <div className="w-[120px] h-[120px] p-[15px] bg-[#3C3976] mb-[40px]">
            <Image src={service1} alt="service" className="w-[80px] h-[80px]" />
          </div>

          <h5 className="text-[1.25rem] h-[60px] leading-5 text-center pb-[24px]">
            {t("interactive-services.check-table")}
          </h5>
          <p className="max-w-[284px] h-[78px] px-[24px] text-center line-clamp-4 leading-[140%] break-words text-[#A2A0B3] text-[16px] leading-5">
            {t("interactive-services.check-table-text")}
          </p>
        </div>
      </div>
    </div>,
    <div
      onClick={() => router.push("/interactive_service/for_entrepreneur")}
      className="block item cursor-pointer mx-[18px] h-auto"
    >
      <div className="gradientBox">
        <div className="hover:bg-[#312E6B] bg-[#3A2F7D] flex flex-col items-center px-[20px] pt-[24px] pb-[42px]">
          <div className="w-[120px] h-[120px] p-[15px] bg-[#3C3976] mb-[40px]">
            <Image src={service2} alt="service" className="w-[80px] h-[80px]" />
          </div>

          <h5 className="text-[1.25rem] h-[60px] leading-5 text-center pb-[24px]">
            {t("interactive-services.for-entrepreneur")}
          </h5>
          <p className="max-w-[284px] h-[78px] px-[24px] text-center line-clamp-4 leading-[140%] break-words text-[#A2A0B3] text-[16px] leading-5">
            {t("interactive-services.for-entrepreneur-text")}
          </p>
        </div>
      </div>
    </div>,
    <div
      onClick={() => router.push("/consumer_note/troubleshooting_guides")}
      className="block item cursor-pointer mx-[18px] h-auto"
    >
      <div className="gradientBox">
        <div className="hover:bg-[#312E6B] bg-[#3A2F7D] flex flex-col items-center px-[20px] pt-[24px] pb-[42px]">
          <div className="w-[120px] h-[120px] p-[15px] bg-[#3C3976] mb-[40px]">
            <Image src={service3} alt="service" className="w-[80px] h-[80px]" />
          </div>

          <h5 className="text-[1.25rem] h-[45px] sm:h-[60px] pb-[10px] sm-[24px] leading-5 text-center line-clamp-2">
            {t("interactive-services.problem-solution")}
          </h5>
          <p className="max-w-[284px] h-[78px] text-center line-clamp-4 text-[#A2A0B3] text-[16px] leading-5">
            {t("interactive-services.problem-solution-text")}
          </p>
        </div>
      </div>
    </div>,
    <div
      onClick={() => router.push("/connect/network")}
      className="block item cursor-pointer mx-[18px] h-auto"
    >
      <div className="gradientBox">
        <div className="hover:bg-[#312E6B] bg-[#3A2F7D] flex flex-col items-center px-[20px] pt-[24px] pb-[42px]">
          <div className="w-[120px] h-[120px] p-[15px] bg-[#3C3976] mb-[40px]">
            <Image src={service4} alt="service" className="w-[80px] h-[80px]" />
          </div>

          <h5 className="text-[1.25rem] h-[60px] leading-5 text-center pb-[24px]">
            {t("interactive-services.take-answer")}
          </h5>
          <p className="max-w-[284px] h-[78px] text-center text-[#A2A0B3] line-clamp-4 text-[16px] leading-5">
            {t("interactive-services.take-answer-text")}
          </p>
        </div>
      </div>
    </div>,
  ];
  return (
    <div className="z-1">
      {isClient ? (
        <div>
          <div className="container">
            <h2 className="subtitle font-montserrat ml-[30px] 2xl:ml-0">
              {t("main-page.interactive-services")}
            </h2>
          </div>
          <div className="carousel-box relative w-auto 2xl:w-[1440px] my-0 mx-auto px-[40px] mb-[120px] z-1">
            <AliceCarousel
              mouseTracking
              items={items}
              responsive={{
                0: { items: 1 },
                850: { items: 2 },
                1160: { items: 3 },
                1360: { items: 3 },
                1450: { items: 4 },
              }}
              controlsStrategy="alternate"
              // autoPlay={true}
              // autoPlayInterval="2000"
              infinite={true}
            />
          </div>
        </div>
      ) : (
        "never"
      )}
    </div>
  );
};

export default Slideshow;
