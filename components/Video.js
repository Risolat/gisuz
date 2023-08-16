"use client";
import React from "react";
import { useRouter } from "next/router";

const Video = () => {
  const { locale } = useRouter();
  const localeVideo = {
    uz: "/photos/main/uz.mp4",
    uzb: "/photos/main/uzb.mp4",
    ru: "/photos/main/ru.mp4",
    en: "/photos/main/eng.mp4",
  };
  const getVideo = () => {
    return localeVideo[locale];
  };
  return (
    <div className="">
      <video autoPlay muted loop className="gradient-overlay w-full">
        <source src={getVideo()} type="video/mp4" />
      </video>
    </div>
  );
};

export default Video;
