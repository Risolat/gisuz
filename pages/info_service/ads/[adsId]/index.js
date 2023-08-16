import React, { useRef, useEffect, useState } from "react";
import axios from "../../../../http";
import Link from "next/link";
import Image from "next/image";
import facebook from "../../../../public/photos/icons/facebook.svg";
import telegram from "../../../../public/photos/icons/telegram.svg";
import date_range from "../../../../public/photos/main/date_range.svg";
import red_eye from "../../../../public/photos/main/red_eye.svg";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../../../next-i18next.config";

const adsDetail = () => {
  const [ads, setads] = useState([]);
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

  const getadsDetail = async () => {
    const response = await axios.get(
      `/${locale}/api/information_service/${query.adsId}`
    );
    const ads = response.data;
    setads(ads);

    const photos = ads.images;
    setPhotos(photos);
    console.log(photos);
  };
  useEffect(() => {
    getadsDetail();
    getData();
  }, []);
  return (
    <div>
      <div className="container">
        <div className="flex flex-row items-start py-[40px]">
          <div className="basis-3/4">
            <h3 className="text-white mt-[40px] description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]">
              {ads.title}
            </h3>
            <div className="flex items-center justify-between pb-[10px]">
              <div className="flex items-center justify-self-end">
                <div className="flex items-center mr-[10px]">
                  <Image
                    className="mr-[5px]"
                    src={date_range}
                    alt={date_range}
                  />
                  <p className="text-[#a2a0b3]">
                    {dayjs(ads.date).format("DD.MM.YYYY")}
                  </p>
                </div>
                <div className="flex items-center">
                  <Image className="mr-[5px]" src={red_eye} alt="red eye" />
                  <p>{ads.view_count}</p>
                </div>
              </div>
              <div className="flex items-center mr-[75px]">
                <Link href="/">
                  <Image src={facebook} alt="facebook" />
                </Link>
                <Link href="/">
                  <Image src={telegram} alt="telegram" />
                </Link>
              </div>
            </div>
            <div>
              {photos.map((p) => (
                <Image
                  src={p.photo}
                  alt="photo"
                  width={1000}
                  height={400}
                  className=""
                />
              ))}
              <div>
                <p
                  className="pr-[40px] desc-html leading-[38px] text-[16px] text-[#A2A0B3] leading-[22px] text-justify font-inter break-words"
                  dangerouslySetInnerHTML={{ __html: ads.description }}
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
export default adsDetail;
