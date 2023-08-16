import React, { useRef, useEffect, useState } from "react";
import axios from "../../../../http";
import Link from "next/link";
import Image from "next/image";
import date_range from "../../../../public/photos/main/date_range.svg";
import red_eye from "../../../../public/photos/main/red_eye.svg";
import dayjs from "dayjs";
import { Icon } from "@iconify/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../../../next-i18next.config";

// import "swiper/css";
// import "swiper/css/navigation";
// import "../../../../../app/slide.css";
// import "./styles.css";

const wisdomDetail = () => {
  const [wisdom, setwisdom] = useState([]);
  const [title, setTitle] = useState();
  const [submenu, setSubmenu] = useState([]);
  const [photos, setPhotos] = useState([]);
  const { t } = useTranslation("index");
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

  const getwisdomDetail = async () => {
    const response = await axios.get(
      `/${locale}/api/information_service/${query.wisdomId}`
    );
    const wisdom = response.data;
    setwisdom(wisdom);

    const photos = wisdom.images[0].photo;
    setPhotos(photos);
  };
  useEffect(() => {
    getwisdomDetail();
    getData();
  }, []);
  return (
    <div>
      <div className="container">
        <div className="flex flex-row items-start py-[40px]">
          <div className="basis-3/4">
            <h3 className="text-white px-[10px] mt-[40px] description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]">
              {wisdom.title}
            </h3>
            <div className="flex items-center justify-between pr-[20px] pb-[10px]">
              <div className="flex items-center justify-self-end">
                <div className="flex items-center mr-[10px]">
                  <Image
                    className="mr-[5px]"
                    src={date_range}
                    alt={date_range}
                  />
                  <p className="text-[#a2a0b3]">
                    {dayjs(wisdom.date).format("DD.MM.YYYY")}
                  </p>
                </div>
                <div className="flex items-center">
                  <Image className="mr-[5px]" src={red_eye} alt="red eye" />
                  <p className="text-[#a2a0b3]">{wisdom.view_count}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Link href="/">
                  <Icon
                    icon="ri:facebook-fill"
                    color="#a2a0b3"
                    width={30}
                    height={30}
                  />
                </Link>
                <Link href="/" className="mx-[10px]">
                  <Icon
                    icon="file-icons:telegram"
                    color="#a2a0b3"
                    width={28}
                    height={28}
                  />
                </Link>
              </div>
            </div>
            <div>
              {/* <Swiper
                slidesPerView={1}
                navigation={true}
                pagination={true}
                keyboard={true}
                modules={[Navigation, Pagination, Keyboard]}
                className="mySwiper "
              >
                {photos.map((i) => (
                  <SwiperSlide key={i.id}>
                    <Image
                      src={i.photo}
                      alt="slide"
                      width={1000}
                      height={600}
                    />
                  </SwiperSlide>
                ))}
              </Swiper> */}
              <Image src={photos} width={1050} height={600} />
              <div>
                <p
                  className="pr-[40px] desc-html leading-[38px] text-[16px] text-[#A2A0B3] leading-[22px] text-justify font-inter break-words"
                  dangerouslySetInnerHTML={{ __html: wisdom.description }}
                />
                <div className="flex item-center"></div>
              </div>
            </div>
          </div>
          <div className="sticky top-[197px] w-[350px] basis-1/4 py-[8px] bg-[#3A2F7D]">
            <p className="mb-[24px] text-[20px] px-[16px]">{title}</p>
            <ul className="">
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

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
    },
  };
}

export async function getStaticPaths(context) {
  return {
    paths: [],
    fallback: true,
  };
}
export default wisdomDetail;
