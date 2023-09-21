import axios from "../../../../http";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper";
import SwiperCore, { Pagination } from "swiper/core";
import Image from "next/image";
import date_range from "../../../../public/photos/main/date_range.svg";
import red_eye from "../../../../public/photos/main/red_eye.svg";
import dayjs from "dayjs";
import { Icon } from "@iconify/react";
import Head from "next/head";

import "swiper/css";
import "swiper/css/navigation";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../../../next-i18next.config";
import { Montserrat } from "next/font/google";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Fancybox from "../../../../components/Fancybox";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
SwiperCore.use([Pagination]);

const newsDetail = () => {
  const [news, setnews] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState("");
  const [submenu, setSubmenu] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const { t } = useTranslation("common");
  const { locale } = useRouter();
  const { query } = useRouter();
  const [view, setview] = useState("");

  const getData = async () => {
    const response = await axios.get(`/${locale}/api/menu/`);

    const menuName = ["INFORMATION_SERVICE"];

    const data = response.data.filter((category) =>
      menuName.includes(category.name)
    );

    const title = data.map((d) => {
      return d.title;
    });
    setTitle(title);
    setSubmenu(data[0].submenu);
  };
  const getNews = async () => {
    const response = await axios(
      `/${locale}/api/information_service/${query.newsId}`
    );
    const news = response.data;
    const photos = response.data.images;
    setnews(news);
    setPhotos(photos);
  };
  const getViewCount = async () => {
    const response = await axios(
      `/${locale}/api/information_service/view_count/${query.newsId}`
    );
    console.log(response);
    setview(response.data.num_views);
  };
  function gallery(i) {
    photos.map((v, index) => {
      if (i === index) {
        new Fancybox([{ src: v.photo, thumb: v.photo }, {}]);
      }
    });
  }

  useEffect(() => {
    getData();
    getNews();
    getViewCount();
  }, []);
  return (
    <div>
      <Head>
        <title>{t("page-titles.info-service.news-archive")}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={`${montserrat.variable} container font-montserrat`}>
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px]">
          <div className="2xl:basis-3/4 basis-full w-full pl-[20px] 2xl:pl-0 mb-[20px] flex flex-col">
            <h3 className="text-white pr-[10px] mt-[40px] description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]">
              {news.title}
            </h3>
            <div className="flex items-center justify-between pb-[20px] pr-[20px] ">
              <div className="flex items-center justify-self-end">
                <div className="flex items-center mr-[10px]">
                  <Icon icon="fa-solid:calendar-alt" color="#a2a0b3" />
                  <p className="pl-[2px] text-[#A2A0B3] font-inter">
                    {dayjs(news.date).format("DD.MM.YYYY")}
                  </p>
                </div>
                <div className="flex items-center">
                  <Image className="mr-[5px]" src={red_eye} alt="red eye" />
                  <p className="text-[#A2A0B3] font-inter">{view}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Link
                  target="_blank"
                  href={`${`https://www.facebook.com/sharer/sharer.php?u=${`http://newgis.technocorp.uz/${locale}/news/info_service/${query}&text=${news.title}`}`}`}
                >
                  <Icon
                    icon="ri:facebook-fill"
                    color="#a2a0b3"
                    width={30}
                    height={30}
                  />
                </Link>
                <Link
                  href={`${`http://telegram.me/share/url?url=http://newgis.technocorp.uz/${locale}/news/info_service/${query}&text=${news.title}`}`}
                  className="mx-[10px]"
                  target="_blank"
                >
                  <Icon
                    icon="file-icons:telegram"
                    color="#a2a0b3"
                    width={28}
                    height={28}
                  />
                </Link>
              </div>
            </div>

            <div className="mr-[30px]">
              <Fancybox
                className="flex items-center"
                options={{
                  Carousel: {
                    infinite: true,
                  },
                }}
              >
                <Swiper
                  slidesPerView={1}
                  spaceBetween={20}
                  loop={true}
                  navigation={true}
                  pagination={{
                    clickable: true,
                  }}
                  keyboard={true}
                  modules={[Navigation, Keyboard]}
                  className="mySwiper w-[1200px] h-full w-full"
                >
                  {photos.map((p, i) => (
                    <SwiperSlide key={i}>
                      <a
                        key={i}
                        href={p.photo}
                        data-fancybox="gallery"
                        className="w-full h-full "
                      >
                        <img
                          className="2xl:w-[1056px] 2xl:h-[625px] w-full mr-[30px]"
                          src={p.photo}
                          alt="slide"
                          width={1056}
                        />
                      </a>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Fancybox>
              <div>
                <p
                  className="pr-[40px] pt-[20px] desc-html leading-[38px] text-[16px] text-[#A2A0B3] leading-[22px] text-justify font-inter break-words"
                  dangerouslySetInnerHTML={{ __html: news.description }}
                />
                <div className="flex item-center"></div>
              </div>
            </div>
          </div>
          <div className="sticky top-[197px] 2xl:w-[350px] w-full 2xl:basis-1/4 basis-full mx-[20px] 2xl:mx-0 py-[8px] bg-[#3A2F7D]">
            <p className="mb-[24px] text-[20px] px-[16px] font-montserrat font-semibold">
              {title}
            </p>
            <ul className="font-inter">
              {submenu.map((item) => (
                <li key={item.id} className="bg-[#3A2F7D]">
                  <div className="gradientBox bg-[#3A2F7D]">
                    <Link
                      className="block py-[10px] px-[16px] font-inter hover:bg-[#24224E] hover:text-white bg-[#3A2F7D] text-[#A2A0B3]"
                      locale={locale}
                      href={`${item.slug}`}
                    >
                      {item.title}
                    </Link>
                  </div>
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
  const locale = context.locale;
  const query = context.query.newsId;
  const res = await axios(`/${locale}/api/information_service/${query}`);
  const news = await res.data;

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
      news: news,
      query: context.query.newsId,
      photos: res.data.images,
      title: title,
      submenu: menu[0].submenu,
      locale: locale,
    },
  };
}
export default newsDetail;
