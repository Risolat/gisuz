import axios from "../../../http";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LightGallery from "lightgallery/react";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../../next-i18next.config";

const page = ({ photos1, photos2, photos3, title, submenu, locale }) => {
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };
  return (
    <div>
      <div className="container">
        <div className="flex flex-row items-start py-[40px]">
          <div className="basis-3/4">
            <h3 className="text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]">
              {submenu[3].title}
            </h3>
            <div className="flex flex-row items-stretch">
              <div className="basis-3/5 relative">
                <Link href={`/info_service/photos/${photos1.id}`}>
                  <Image
                    unoptimized
                    src={photos1.cover}
                    alt="gallery"
                    width={600}
                    height={300}
                    className="object-cover w-full h-full opacity-50 hover:opacity-100"
                  />
                  <p className="absolute text-white line-clamp-2 text-[1.12em] font-bold font-montserrat h-[50px] bottom-2 left-1 z-10 break-words">
                    {photos1.name}
                  </p>
                </Link>
              </div>
              <div className="basis-2/5 ">
                <div className="relative">
                  <Link href={`/info_service/photos/${photos2.id}`}>
                    <Image
                      unoptimized
                      src={photos2.cover}
                      alt="gallery1"
                      width={300}
                      height={300}
                      className="w-full px-[30px] mb-[20px] opacity-50 hover:opacity-100 "
                    />
                    <p className="absolute w-[310px] ml-[30px] text-white line-clamp-2 text-[1em] font-bold font-montserrat h-[50px] bottom-1 left-1 z-10 break-words">
                      {photos2.name}
                    </p>
                  </Link>
                </div>
                <div className="relative">
                  <Link href={`/info_service/photos/${photos3.id}`}>
                    <Image
                      unoptimized
                      src={photos3.cover}
                      alt="gallery2"
                      width={300}
                      height={300}
                      className="w-full px-[30px] mt-[20px] opacity-50 hover:opacity-100"
                    />
                    <p className="absolute ml-[30px] text-white line-clamp-2 text-[1em] font-bold font-montserrat h-[40px] bottom-1 left-1 z-10 break-words">
                      {photos3.name}
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="sticky top-[197px] w-[350px] basis-1/4 py-[8px] bg-[#3A2F7D]">
            <p className="mb-[24px] text-[20px] px-[16px]">{title}</p>
            <ul className="">
              {submenu.map((item) => (
                <li key={item.id} className="bg-[#3A2F7D]">
                  {item.slug === "/info_service/photos" ? (
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
  const res = await axios(`/${locale}/api/gallery/photos/`);
  console.log(res);
  const response = await axios.get(`/${locale}/api/menu/`);
  const menuName = ["INFORMATION_SERVICE"];
  const menu = response.data.filter((category) =>
    menuName.includes(category.name)
  );
  const title = menu.map((d) => {
    return d.title;
  });

  console.log(menu[0].submenu);
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
      photos1: res.data[0],
      photos2: res.data[1],
      photos3: res.data[2],
      title: title,
      submenu: menu[0].submenu,
      locale: locale,
    },
  };
}
export default page;
