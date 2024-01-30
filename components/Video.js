"use client";
import React from "react";
import { useRouter } from "next/router";
import animatedLogo from "../public/photos/icons/animatedLogo.png";
import Image from "next/image";

const Video = () => {
  const { locale } = useRouter();
  const localeVideo = {
    uz: "/photos/main/pink.webm",
    uzb: "/photos/main/uzb.webm",
    ru: "/photos/main/ru.webm",
    en: "/photos/main/eng.webm",
  };
  const getVideo = () => {
    return localeVideo[locale];
  };
  return (
    <div>
      <div className="w-full flex items-center justify-center hidden xl:block">
        <video autoPlay muted loop className="">
          <source src={getVideo()} type="video/mp4" className=" w-full" />
        </video>
      </div>
      <div className="w-full flex items-center justify-center xl:hidden">
        <div className="animated"></div>
        {/* <Image
          alt="animatedLogo"
          className="w-[70%] h-[70%] object-contain"
          src={animatedLogo}
          width={600}
          height={500}
        /> */}
      </div>
    </div>
  );
};

export default Video;
