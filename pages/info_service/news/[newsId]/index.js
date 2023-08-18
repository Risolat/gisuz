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
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import "swiper/css";
import "swiper/css/navigation";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../../../next-i18next.config";
import { Montserrat } from "next/font/google";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

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
  }, []);
  return (
    <div>
      <div className={`${montserrat.variable} container font-montserrat`}>
        <div className="flex flex-row items-start py-[40px]">
          <div className="basis-3/4">
            <h3 className="text-white px-[10px] mt-[40px] description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]">
              {news.title}
            </h3>
            <div className="flex items-center justify-between pb-[20px] pr-[20px] ">
              <div className="flex items-center justify-self-end">
                <div className="flex items-center mr-[10px]">
                  <Image
                    // className="mr-[5px]"
                    src={date_range}
                    alt={date_range}
                  />
                  <p className="pl-[2px] text-[#A2A0B3]">
                    {dayjs(news.date).format("DD.MM.YYYY")}
                  </p>
                </div>
                <div className="flex items-center">
                  <Image className="mr-[5px]" src={red_eye} alt="red eye" />
                  <p className="text-[#A2A0B3]">{news.view_count}</p>
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

            <div className="">
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
                className="mySwiper w-[1200px] h-full"
              >
                {photos.map((p, i) => (
                  <SwiperSlide key={i}>
                    {/* <a
                      href={p.photo}
                      onClick={() => gallery(i)}
                    > */}
                    <div className="w-full h-full">
                      <img
                        className="w-[1056px] h-[625px]"
                        src={p.photo}
                        alt="slide"
                        width={1056}
                      />
                    </div>

                    {/* </a> */}
                  </SwiperSlide>
                ))}
              </Swiper>
              <div>
                <p
                  className="pr-[40px] pt-[20px] desc-html leading-[38px] text-[16px] text-[#A2A0B3] leading-[22px] text-justify font-inter break-words"
                  dangerouslySetInnerHTML={{ __html: news.description }}
                />
                <div className="flex item-center"></div>
              </div>
            </div>
          </div>
          <div className="sticky top-[197px] w-[350px] basis-1/4 py-[8px] bg-[#3A2F7D]">
            <p className="mb-[24px] text-[20px] px-[16px]">{title}</p>
            <ul className="font-inter">
              {submenu.map((item) => (
                <li key={item.id} className="bg-[#3A2F7D]">
                  <div className="gradientBox bg-[#3A2F7D]">
                    <Link
                      className="block py-[10px] px-[16px] hover:bg-[#24224E] hover:text-white bg-[#3A2F7D] text-[#A2A0B3]"
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
