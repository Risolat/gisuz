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
import { useEffect } from "react";

const photosDetail = ({
  images,
  firstImage,
  middleImg,
  lastImg,
  title,
  submenu,
  locale,
  query,
}) => {
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
      <div className="container">
        <div className="flex flex-row items-start py-[40px]">
          <div className="basis-3/4 pr-[20px]">
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
                    <div className="flex flex-wrap">
                      <div className="">
                        <a
                          className="w-[696px] h-[475px] mr-[10px] mb-[10px] block"
                          data-fancybox="gallery"
                          href={images[0].image}
                          width={696}
                          height={475}
                        >
                          <img
                            className="w-[696px] h-[475px]"
                            alt="image"
                            src={images[0].image}
                            width={696}
                            height={475}
                          />
                        </a>
                      </div>
                      <div>
                        <a
                          className="galleryLink"
                          data-fancybox="gallery"
                          href={images[1].image}
                          width={336}
                          height={222}
                        >
                          <img
                            alt=""
                            src={images[1].image}
                            width={336}
                            height={222}
                          />
                        </a>
                        <a
                          className="galleryLink"
                          data-fancybox="gallery"
                          href={images[2].image}
                          width={336}
                          height={222}
                        >
                          <img
                            alt=""
                            src={images[2].image}
                            width={336}
                            height={222}
                          />
                        </a>
                      </div>
                      <div className="flex flex-wrap">
                        <a
                          className="galleryLink"
                          data-fancybox="gallery"
                          href={images[3].image}
                        >
                          <img
                            alt=""
                            src={images[3].image}
                            width={336}
                            height={222}
                          />
                        </a>
                        {images[4] ? (
                          <a
                            className="galleryLink"
                            data-fancybox="gallery"
                            href={images[4].image}
                          >
                            <img
                              alt=""
                              src={images[4].image}
                              width={336}
                              height={222}
                            />
                          </a>
                        ) : (
                          ""
                        )}
                        {images[5] ? (
                          <a
                            className="galleryLink"
                            data-fancybox="gallery"
                            href={images[5].image}
                          >
                            <img
                              alt=""
                              src={images[5].image}
                              width={336}
                              height={222}
                            />
                          </a>
                        ) : (
                          ""
                        )}
                        {images[6] ? (
                          <a
                            className="galleryLink"
                            data-fancybox="gallery"
                            href={images[6].image}
                          >
                            <img
                              alt=""
                              src={images[6].image}
                              width={336}
                              height={222}
                            />
                          </a>
                        ) : (
                          ""
                        )}
                        {images[7] ? (
                          <a
                            className="galleryLink"
                            data-fancybox="gallery"
                            href={images[7].image}
                          >
                            <img
                              alt=""
                              src={images[7].image}
                              width={336}
                              height={222}
                            />
                          </a>
                        ) : (
                          ""
                        )}
                        {images[8] ? (
                          <a
                            className="galleryLink"
                            data-fancybox="gallery"
                            href={images[8].image}
                          >
                            <img
                              alt=""
                              src={images[8].image}
                              width={336}
                              height={222}
                            />
                          </a>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </Fancybox>
                </div>
                {/* <LightGallery
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
                </LightGallery> */}
                {/* <LightGallery
                  onInit={onInit}
                  speed={500}
                  plugins={[lgThumbnail, lgZoom]}
                  className="grid grid-rows-3 grid-flow-col gap-4"
                >
                  <Link href={images[0].image} className="row-span-3">
                    <img
                      unoptimized
                      className="galleryImage"
                      src={images[0].image}
                      alt={images[0].title}
                    />
                  </Link>
                  <Link
                    href={images[1].image}
                    className="row-span-2 col-span-2"
                  >
                    <img
                      unoptimized
                      className="galleryImage"
                      src={images[1].image}
                      alt={images[1].title}
                    />
                  </Link>
                  <Link
                    href={images[2].image}
                    className="row-span-2 col-span-2"
                  >
                    <img
                      unoptimized
                      className="galleryImage"
                      src={images[2].image}
                      alt={images[2].title}
                    />
                  </Link>
                </LightGallery> */}
              </div>
              {/* <div className="flex items-center justify-between w-full ml-[1px] mt-[10px]">
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
              </div> */}
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

export async function getServerSideProps(context) {
  const locale = context.locale;
  const query = context.query.photosId;
  const res = await axios(`/${locale}/api/gallery/photos/${query}`);

  const response = await axios.get(`/${locale}/api/menu/`);
  const menuName = ["INFORMATION_SERVICE"];
  const menu = response.data.filter((category) =>
    menuName.includes(category.name)
  );
  const title = menu.map((d) => {
    return d.title;
  });
  console.log(res, "photos");
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
      firstImage: res.data.images.slice(0, 1),
      middleImg: res.data.images.slice(1, 3),
      lastImg: res.data.images.slice(3),
      images: res.data.images,
      query: context.query.photosId,
      title: title,
      submenu: menu[0].submenu,
      locale: locale,
    },
  };
}
export default photosDetail;
