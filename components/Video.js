"use client";
import React from "react";
import { useRouter } from "next/router";

const Video = () => {
  const { locale } = useRouter();
  const localeVideo = {
    uz: "/photos/main/pink.mp4",
    uzb: "/photos/main/uzb.mp4",
    ru: "/photos/main/ru.mp4",
    en: "/photos/main/eng.mp4",
  };
  const getVideo = () => {
    return localeVideo[locale];
  };
  return (
    <div className="w-full flex items-center justify-center">
      <video autoPlay muted loop>
        <source
          src={getVideo()}
          type="video/mp4"
          className="gradient-overlay w-full"
        />
      </video>
    </div>
  );
};

export default Video;
