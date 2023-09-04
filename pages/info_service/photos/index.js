import axios from "../../../http";
import Link from "next/link";
import Image from "next/image";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../../next-i18next.config";
import { Montserrat } from "next/font/google";
import Head from "next/head";
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const page = ({ photos1, photos2, photos3, title, submenu, locale }) => {
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };
  return (
    <div>
      <Head>
        <title>{submenu[3].title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px]">
          <div className="2xl:basis-3/4 basis-full w-full pl-[20px] 2xl:pl-0 mb-[20px]">
            <h3
              className={`${montserrat.variable} text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]`}
            >
              {submenu[3].title}
            </h3>
            <div className="flex lg:flex-row items-stretch flex-col">
              <div className="lg:basis-3/5 basis-full relative">
                <Link href={`/info_service/photos/${photos1.id}`}>
                  <img
                    unoptimized
                    src={photos1.cover}
                    alt="gallery"
                    width={600}
                    height={300}
                    className="object-cover md:px-[30px] xl:px-[0] pb-[10px] xl:pb-[0] w-full h-full opacity-50 hover:opacity-100"
                  />
                  <p className="absolute text-white line-clamp-2 lg:text-[1.12em] text-[14px] w-[280px] font-bold font-montserrat h-[70px] bottom-2 left-[10%] lg:left-[5%] z-10 break-words">
                    {photos1.name}
                  </p>
                </Link>
              </div>
              <div className="lg:basis-2/5 basis-full">
                <div className="relative">
                  <Link href={`/info_service/photos/${photos2.id}`}>
                    <img
                      unoptimized
                      src={photos2.cover}
                      alt="gallery1"
                      width={300}
                      height={300}
                      className="w-full md:px-[30px] pb-[10px] xl:pb-[0] mb-[20px] opacity-50 hover:opacity-100 "
                    />
                    <p className="absolute lg:w-[310px] ml-[30px] text-[14px] lg:text-[16px] text-white line-clamp-2 font-bold font-montserrat h-[70px] bottom-1 left-1 z-10 break-words">
                      {photos2.name}
                    </p>
                  </Link>
                </div>
                <div className="relative">
                  <Link href={`/info_service/photos/${photos3.id}`}>
                    <img
                      unoptimized
                      src={photos3.cover}
                      alt="gallery2"
                      width={300}
                      height={300}
                      className="w-full md:px-[30px] pb-[10px] xl:pb-[0] mt-[20px] opacity-50 hover:opacity-100"
                    />
                    <p className="absolute ml-[30px] text-white line-clamp-2 text-[1em] font-bold font-montserrat h-[40px] bottom-1 left-1 z-10 break-words">
                      {photos3.name}
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="sticky top-[272px] mt-[85px] 2xl:w-[350px] w-full 2xl:basis-1/4 basis-full mx-[20px] 2xl:mx-0  py-[8px] bg-[#3A2F7D]">
            <p
              className={`${montserrat.variable} font=montserrat font-semibold mb-[24px] text-[20px] px-[16px]`}
            >
              {title}
            </p>
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
