import axios from "../../../../http";
import Link from "next/link";
import Image from "next/image";
import LightGallery from "lightgallery/react";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../../../next-i18next.config";
import Fancybox from "../../../../components/Fancybox";
import Head from "next/head";
import dayjs from "dayjs";
import Sidebar from "@/components/Sidebar";
const photosDetail = ({
  images,
  firstImage,
  middleImg,
  lastImg,
  locale,
  response,
}) => {
  console.log(response);
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };
  function gallery3(index) {
    lastImg.map((v, i) => {
      if (index === i) {
        new Fancybox([{ src: v.image, thumb: v.image }, {}]);
      }
    });
  }
  function gallery() {
    Fancybox.show([{ src: firstImage[0].image, thumb: firstImage[0].image }]);
  }
  function gallery2(index) {
    middleImg.map((v, i) => {
      if (index === i) {
        new Fancybox([{ src: v.image, thumb: v.image }, {}]);
      }
    });
  }
  return (
    <div>
      <Head>
        <title>
          {locale === "uz"
            ? "Fotogalereya"
            : locale === "ru"
            ? "Фотогалерея"
            : locale === "uzb"
            ? "Фотогалерея"
            : "Photo gallery"}
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px]">
          <div className="2xl:basis-3/4 basis-full w-full pl-[20px] 2xl:pl-0 mb-[20px] pr-[20px]">
            <p className="pb-2 text-[18px] text-[#A2A0B3]">
              {dayjs(response.updated_at).format("DD.MM.YYYY")}
            </p>
            <div className="mb-[20px]">
              <div>
                <div className="flex">
                  <Fancybox
                    className="flex"
                    options={{
                      Carousel: {
                        infinite: true,
                      },
                    }}
                  >
                    <div className="flex flex-wrap justify-center 2xl:justify-start">
                      <div className="">
                        <a
                          className="md:w-[696px] md:h-[475px] sm:w-[400px] sm:h-[270px] w-[300px] h-[200px] mr-[10px] mb-[10px] block"
                          data-fancybox="gallery"
                          href={images[0].image}
                          width={696}
                          height={475}
                        >
                          <img
                            className="md:w-[696px] md:h-[475px] sm:w-[400px] sm:h-[270px] w-[300px] h-[200px]"
                            alt="image"
                            src={images[0].image}
                            width={696}
                            height={475}
                          />
                        </a>
                      </div>
                      <div>
                        <a
                          className="xl:w-[336px] xl:h-[222px] md:w-[696px] md:h-[475px] sm:w-[400px] sm:h-[270px] w-[300px] h-[200px] block mr-[16px] mb-[25px]"
                          data-fancybox="gallery"
                          href={images[1].image}
                        >
                          <img alt="" src={images[1].image} />
                        </a>
                        <a
                          className="xl:w-[336px] xl:h-[222px] md:w-[696px] md:h-[475px] sm:w-[400px] sm:h-[270px] w-[300px] h-[200px] block mr-[16px] mb-[25px]"
                          data-fancybox="gallery"
                          href={images[2].image}
                        >
                          <img alt="" src={images[2].image} />
                        </a>
                      </div>
                      <div className="flex flex-wrap justify-center 2xl:justify-start">
                        <a
                          className="xl:w-[336px] xl:h-[222px] md:w-[696px] md:h-[475px] sm:w-[400px] sm:h-[270px] w-[300px] h-[200px] block mr-[16px] mb-[25px]"
                          data-fancybox="gallery"
                          href={images[3].image}
                        >
                          <img alt="" src={images[3].image} />
                        </a>
                        {images[4] ? (
                          <a
                            className="xl:w-[336px] xl:h-[222px] md:w-[696px] md:h-[475px] sm:w-[400px] sm:h-[270px] w-[300px] h-[200px] block mr-[16px] mb-[25px]"
                            data-fancybox="gallery"
                            href={images[4].image}
                          >
                            <img alt="" src={images[4].image} />
                          </a>
                        ) : (
                          ""
                        )}
                        {images[5] ? (
                          <a
                            className="xl:w-[336px] xl:h-[222px] md:w-[696px] md:h-[475px] sm:w-[400px] sm:h-[270px] w-[300px] h-[200px] block mr-[16px] mb-[25px]"
                            data-fancybox="gallery"
                            href={images[5].image}
                          >
                            <img alt="" src={images[5].image} />
                          </a>
                        ) : (
                          ""
                        )}
                        {images[6] ? (
                          <a
                            className="xl:w-[336px] xl:h-[222px] md:w-[696px] md:h-[475px] sm:w-[400px] sm:h-[270px] w-[300px] h-[200px] block mr-[16px] mb-[25px]"
                            data-fancybox="gallery"
                            href={images[6].image}
                          >
                            <img alt="" src={images[6].image} />
                          </a>
                        ) : (
                          ""
                        )}
                        {images[7] ? (
                          <a
                            className="xl:w-[336px] xl:h-[222px] md:w-[696px] md:h-[475px] sm:w-[400px] sm:h-[270px] w-[300px] h-[200px] block mr-[16px] mb-[25px]"
                            data-fancybox="gallery"
                            href={images[7].image}
                          >
                            <img alt="" src={images[7].image} />
                          </a>
                        ) : (
                          ""
                        )}
                        {images[8] ? (
                          <a
                            className="xl:w-[336px] xl:h-[222px] md:w-[696px] md:h-[475px] sm:w-[400px] sm:h-[270px] w-[300px] h-[200px] block mr-[16px] mb-[25px]"
                            data-fancybox="gallery"
                            href={images[8].image}
                          >
                            <img alt="" src={images[8].image} />
                          </a>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </Fancybox>
                </div>
              </div>
            </div>
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const locale = context.locale;
  const query = context.query.photosId;
  const res = await axios(`/${locale}/api/gallery/photos/${query}`);
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
      response: res.data,
      firstImage: res.data.images.slice(0, 1),
      middleImg: res.data.images.slice(1, 3),
      lastImg: res.data.images.slice(3),
      images: res.data.images,
    },
  };
}
export default photosDetail;
