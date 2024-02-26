import axios from "../../http";
import Link from "next/link";
import Image from "next/image";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../next-i18next.config";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import dayjs from "dayjs";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const page = ({ title, submenu, infographics, locale }) => {
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };
  return (
    <div>
      <Head>
        <title>{infographics[0].sub_menu}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={`${montserrat.variable} container font-montserrat`}>
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px]">
          <div className="2xl:basis-3/4 basis-full w-full pl-[20px] 2xl:pl-0 mb-[20px]">
            <h3 className="text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[30px]">
              {infographics[0].sub_menu}
            </h3>
            <p className="pb-2 text-[18px] text-[#A2A0B3]">{dayjs(infographics[0].updated_at).format("DD.MM.YYYY")}</p>
            <div className="mr-[20px]">
              <div className="flex items-center justify-center flex-wrap">
                <LightGallery
                  onInit={onInit}
                  speed={500}
                  plugins={[lgThumbnail, lgZoom]}
                  className="pr-[16px] flex items-center justify-center"
                >
                  {infographics.map((r) => (
                    <Link
                      key={r.id}
                      href={r.photo}
                      className="infographics py-[16px] block w-[300px] xl:w-[342px]"
                    >
                      <Image
                        className="w-[300px] xl:w-[342px] h-[200px]"
                        src={r.photo}
                        alt={r.title}
                        width={342}
                        height={200}
                      />
                      <p className="mt-[10px] mb-[10px] h-[84px] text-[#A2A0B3] hover:text-[#3D8DFF] max-h-[84px] font-semibold font-montserrat text-[1.25em] leading-[28px] line-clamp-3">
                        {r.title}
                      </p>
                    </Link>
                  ))}
                </LightGallery>
              </div>
            </div>
          </div>
          <div className="sticky top-[272px] 2xl:w-[350px] w-full 2xl:basis-1/4 basis-full mx-[20px] 2xl:mx-0  py-[8px] bg-[#3A2F7D]">
            <p className="mb-[24px] text-[20px] px-[16px] font-montserrat font-semibold">
              {title}
            </p>
            <ul className="">
              {submenu.map((item) => (
                <li key={item.id} className="bg-[#3A2F7D]">
                  {item.slug === "/info_service/infographics" ? (
                    <div className="gradientBox  bg-[#3A2F7D] font-inter">
                      <Link
                        className="block py-[10px] px-[16px] mx-[3px] hover:bg-[#24224E] bg-[#171142] text-white font-inter"
                        href={`${item.slug}`}
                      >
                        {item.title}
                      </Link>
                    </div>
                  ) : (
                    <div className="gradientBox bg-[#3A2F7D]">
                      <Link
                        className="block py-[10px] px-[16px] hover:bg-[#24224E] hover:text-white bg-[#3A2F7D] text-[#A2A0B3] font-inter"
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
  const res = await axios(
    `/${locale}/api/information_service/infographicsBySlug/?submenu_slug=/info_service/infographics`
  );
  const data = await res.data;

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
      infographics: data,
      title: title,
      submenu: menu[0].submenu,
      locale: locale,
    },
  };
}
export default page;
