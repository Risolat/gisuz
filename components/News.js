"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import date from "../public/photos/main/date.svg";
import eye from "../public/photos/main/eye.svg";
import axios from "../http";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const News = () => {
  const { locale } = useRouter();
  const { t } = useTranslation("common");
  const [mainNews, setmainNews] = useState([]);
  const [secondaryNewsList, setsecondaryNewsList] = useState([]);
  const [image, setImage] = useState([]);
  const getNews = async () => {
    const response = await axios.get(
      `/${locale}/api/information_service/newsForHomePage/?submenu_slug=/info_service/news`
    );
    const mainNews = response.data[0];
    const image = mainNews.images[0];
    setmainNews(mainNews);
    setImage(image);
    const secondaryNewsList = response.data.slice(1);
    setsecondaryNewsList(secondaryNewsList);
    console.log(response, "news");
  };
  useEffect(() => {
    getNews();
  }, []);

  return (
    <div className="container">
      <h2 className="subtitle font-montserrat ml-[30px] 2xl:ml-0">
        {t("main-page.news")}
      </h2>
      <div className="flex flex-row items-start flex-wrap pb-[150px]">
        <Link
          href={`/${locale}/info-service/news/${mainNews.id}`}
          className="relative w-full mb-[50px] 2xl:basis-9/12 px-[30px]"
        >
          <Image
            unoptimized
            src={image.photo}
            alt="news"
            className="h-[571px] w-full object-cover"
            width="1000"
            height="500"
            loading="lazy"
          />

          <div className="absolute h-[180px] left-[26px] bottom-[-30px] p-[16px] bg-[#3C3976] w-[300px] sm:w-[400px] md:w-[687px]">
            <div className="flex items-center py-[5px] text-[#A2A0B3] text-[12px]">
              <div className="flex items-center pr-[5px]">
                <Image src={date} alt="date" className="mr-[5px]" />
                <p className="">{mainNews.date}</p>
              </div>

              <p className="mr-[5px]"> | </p>

              <div className="flex items-center">
                <Image src={eye} alt="eye" className="mr-[5px]" />
                <p>{mainNews.view_count}</p>
              </div>
            </div>
            <h3 className="font-bold h-[35px] truncate">{mainNews.title}</h3>
            <div
              className="line-clamp-3 text-[#A2A0B3] leading-[140%] font-inter break-words"
              dangerouslySetInnerHTML={{ __html: mainNews.description }}
            />
          </div>
        </Link>

        <div className="w-full px-[20px] 2xl:basis-3/12">
          <ul>
            {secondaryNewsList.map((item) => (
              <li
                key={item.id}
                className="pb-[10px] mb-[20px] border-[#ececec] border-b-[1px]"
              >
                <Link href={`/info-service/news/${item.id}`}>
                  <div className="flex items-center py-[5px] text-[#A2A0B3] text-[12px]">
                    <div className="flex items-center pr-[5px]">
                      <Image src={date} alt="date" className="mr-[5px]" />
                      <p className="">{item.date}</p>
                    </div>

                    <p className="mr-[5px]"> | </p>

                    <div className="flex items-center">
                      <Image src={eye} alt="eye" className="mr-[5px]" />
                      <p>{item.view_count}</p>
                    </div>
                  </div>
                  <h4 className="line-clamp-3 leading-5">{item.title}</h4>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default News;
