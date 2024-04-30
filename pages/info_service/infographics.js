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
import Sidebar from "@/components/Sidebar";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const page = ({ infographics }) => {
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };
  return (
    <div>
      <Head>
        <title>{infographics[0].sub_menu}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px]">
          <div
            className={`${montserrat.variable} font-montserrat 2xl:basis-3/4 basis-full w-full pl-[20px] 2xl:pl-0 mb-[20px]`}
          >
            <h3 className="text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[30px]">
              {infographics[0].sub_menu}
            </h3>
            <p className="pb-2 text-[18px] text-[#A2A0B3]">
              {dayjs(infographics[0].updated_at).format("DD.MM.YYYY")}
            </p>
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
          <Sidebar />
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
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
      infographics: data,
    },
  };
}
export default page;
