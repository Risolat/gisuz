import React, { useRef, useEffect, useState } from "react";
import axios from "../../../../http";
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
import i18nextConfig from "../../../../next-i18next.config";

const photosDetail = () => {
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };
  const [title, setTitle] = useState();
  const [submenu, setSubmenu] = useState([]);
  const [images, setimages] = useState([]);
  const [name, setname] = useState("");
  const [firstImage, setfirstImage] = useState([]);
  const [middleImg, setmiddleImg] = useState([]);
  const [lastImg, setlastImg] = useState([]);
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

  const getphotosDetail = async () => {
    const response = await axios.get(
      `/${locale}/api/gallery/photos/${query.photosId}`
    );

    const name = response.data.name;
    setname(name);
    const firstImage = response.data.images.slice(0, 1);
    setfirstImage(firstImage);
    const middleImg = response.data.images.slice(1, 3);
    setmiddleImg(middleImg);
    const lastImg = response.data.images.slice(3);
    setlastImg(lastImg);
  };
  useEffect(() => {
    getphotosDetail();
    getData();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="flex flex-row items-start py-[40px]">
          <div className="basis-3/4 pr-[30px]">
            <div className="">
              <div className="flex items-start justify-between">
                <LightGallery
                  onInit={onInit}
                  speed={500}
                  plugins={[lgThumbnail, lgZoom]}
                  className="pr-[16px] flex items-center justify-between"
                >
                  {firstImage.map((r, i) => (
                    <Link
                      key={i}
                      href={r.image}
                      className="w-[696px] h-[468px] block mr-[20px]"
                    >
                      <Image
                        unoptimized
                        className="w-full h-full object-cover"
                        src={r.image}
                        alt={r.title}
                        width={342}
                        height={200}
                      />
                    </Link>
                  ))}
                </LightGallery>
                <LightGallery
                  onInit={onInit}
                  speed={500}
                  plugins={[lgThumbnail, lgZoom]}
                  className="pr-[16px] flex items-center justify-between"
                >
                  {middleImg.map((r, i) => (
                    <Link
                      key={i}
                      href={r.image}
                      className="w-[342px] h-full block mb-[20px]"
                    >
                      <Image
                        unoptimized
                        className="w-[342px] h-[222px] object-cover"
                        src={r.image}
                        alt={r.title}
                        width={342}
                        height={200}
                      />
                    </Link>
                  ))}
                </LightGallery>
              </div>
              <div className="flex items-center justify-between w-full ml-[1px] mt-[10px]">
                <LightGallery
                  onInit={onInit}
                  speed={500}
                  plugins={[lgThumbnail, lgZoom]}
                  className="pr-[16px] flex items-center justify-between w-full"
                >
                  {lastImg.map((r, i) => (
                    <Link
                      key={i}
                      href={r.image}
                      className="w-[336px] h-full block mb-[20px] mr-[22px] lastImageGallery"
                    >
                      <Image
                        unoptimized
                        className="w-[336px] h-[222px] object-cover"
                        src={r.image}
                        alt={r.title}
                        width={336}
                        height={200}
                      />
                    </Link>
                  ))}
                </LightGallery>
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
export default photosDetail;
