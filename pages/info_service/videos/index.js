import axios from "../../../http";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import play from "../../../public/photos/icons/play.svg";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../../next-i18next.config";
import { Montserrat } from "next/font/google";
import Head from "next/head";
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const page = ({ videos1, videos2, videos3, title, submenu, locale }) => {
  const containerRef = useRef(null);

  function videoPlay3(index) {
    videos3.map((v, i) => {
      if (index === i) {
        new Fancybox([{ src: v.link, thumb: v.cover }, {}]);
      }
    });
  }
  function videoPlay() {
    Fancybox.show([{ src: videos1[0].link, thumb: videos1[0].cover }]);
  }
  function videoPlay2(index) {
    videos2.map((v, i) => {
      if (index === i) {
        new Fancybox([{ src: v.link, thumb: v.cover }, {}]);
      }
    });
  }

  return (
    <div>
      <Head>
        <title>{submenu[4].title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px]">
          <div className="2xl:basis-3/4 basis-full w-full pl-[20px] 2xl:pl-0 mb-[20px] pr-[20px]">
            <h3
              className={`${montserrat.variable} text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]`}
            >
              {submenu[4].title}
            </h3>
            <div className="flex flex-col xl:flex-row items-center xl:items-start mb-[20px] justify-center 2xl:justify-between">
              <div className="flex flex-wrap justify-between xl:mr-[20px]  cursor-pointer relative">
                {videos1.map((v) => (
                  <div key={v.id}>
                    <a
                      data-fancybox="gallery"
                      data-type="iframe"
                      data-text={v.title}
                      data-caption={v.title}
                      onClick={() => videoPlay()}
                    >
                      <img
                        src={v.cover}
                        alt="photo"
                        className="xl:w-[700px] xl:h-[468px] w-[336px] h-[222px] mb-[20px] xl:mb-[0] object-cover"
                      />
                      <Image
                        src={play}
                        className="absolute top-[calc(33%)] xl:top-[calc(50%-30px)] left-[calc(50%-26px)]  w-[60px] h-[60px]"
                        alt="photo"
                        width={60}
                        height={60}
                      />
                      <span className="absolute bottom-0 bg-[#3C3971] bg-opacity-40">
                        <p className="w-full text-white font-montserrat text-[1em] break-words  line-clamp-2">
                          {v.title}
                        </p>
                      </span>
                    </a>
                  </div>
                ))}
              </div>
              <div>
                {videos2.map((v, index) => (
                  <div className="mb-[20px] relative cursor-pointer" key={v.id}>
                    <a
                      data-fancybox="gallery"
                      data-type="iframe"
                      data-text={v.title}
                      data-caption={v.title}
                      onClick={() => videoPlay2(index)}
                    >
                      <img
                        src={v.cover}
                        alt="photo"
                        className="w-[336px] h-[222px] object-cover"
                      />
                      <Image
                        src={play}
                        className="absolute top-[calc(52%-30px)] left-[calc(50%-26px)]  w-[60px] h-[60px]"
                        alt="photo"
                        width={60}
                        height={60}
                      />
                      <span className="absolute bottom-0 bg-[#3C3971] bg-opacity-40">
                        <p className="w-full text-white font-montserrat text-[1em] break-words  line-clamp-2">
                          {v.title}
                        </p>
                      </span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div
              ref={containerRef}
              options={{
                Carousel: {
                  infinite: false,
                },
              }}
              className="flex items-center justify-center 2xl:justify-between flex-wrap mr-0"
            >
              {videos3.map((v, index) => (
                <div key={index} className="video-wrapper relative mb-[15px]">
                  <a
                    data-key={index}
                    data-fancybox="gallery"
                    data-type="iframe"
                    data-text={v.title}
                    data-caption={v.title}
                    onClick={() => videoPlay3(index)}
                  >
                    <img
                      src={v.cover}
                      alt="photo"
                      className="w-[336px] h-[222px] object-cover"
                    />
                    <Image
                      src={play}
                      className="absolute top-[calc(52%-30px)] left-[calc(50%-26px)] w-[60px] h-[60px]"
                      alt="photo"
                      width={60}
                      height={60}
                    />
                    <span className="absolute bottom-0 bg-[#3C3971] bg-opacity-40">
                      <p className="w-full text-white font-montserrat text-[1em] break-words  line-clamp-2">
                        {v.title}
                      </p>
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="sticky top-[255px] 2xl:w-[350px] w-full 2xl:basis-1/4 basis-full mx-[20px] 2xl:mx-0  py-[8px] bg-[#3A2F7D]">
            <p
              className={`${montserrat.variable} font-montserrat font-semibold mb-[24px] text-[20px] px-[16px]`}
            >
              {title}
            </p>
            <ul className="">
              {submenu.map((item) => (
                <li key={item.id} className="bg-[#3A2F7D]">
                  {item.slug === "/info_service/videos" ? (
                    <div className="gradientBox  bg-[#3A2F7D]">
                      <Link
                        className="block py-[10px] px-[16px] mx-[3px] hover:bg-[#24224E] bg-[#171142] text-white"
                        href={`${item.slug}`}
                      >
                        {item.title}
                      </Link>
                    </div>
                  ) : (
                    <div className="gradientBox bg-[#3A2F7D]">
                      <Link
                        className="block py-[10px] px-[16px] hover:bg-[#24224E] hover:text-white bg-[#3A2F7D] text-[#A2A0B3]"
                        locale={locale}
                        href={`${item.slug}`}
                      >
                        {item.title}
                      </Link>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  console.log(context, "context");
  const locale = context.locale;
  const res = await axios(`/${locale}/api/gallery/videos/`);

  const response = await axios.get(`/${locale}/api/menu/`);
  const menuName = ["INFORMATION_SERVICE"];
  const menu = response.data.filter((category) =>
    menuName.includes(category.name)
  );
  const title = menu.map((d) => {
    return d.title;
  });
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
      videos1: res.data.slice(0, 1),
      videos2: res.data.slice(1, 3),
      videos3: res.data.slice(3),
      title: title,
      submenu: menu[0].submenu,
      locale: locale,
    },
  };
}
export default page;
