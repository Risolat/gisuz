import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import axios from "../../../../http";
import Link from "next/link";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../../../next-i18next.config";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import reportsDetail from "@/pages/activity/reports/[reportsId]";
import Sidebar from "@/components/Sidebar";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const vacancyDetail = ({ title, submenu, vacancy, locale }) => {
  console.log(vacancy);
  return (
    <div className="mb-[150px]">
      <Head>
        <title>{vacancy.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px]">
          <div className="2xl:basis-3/4 basis-full w-full pl-[20px] 2xl:pl-0 mb-[20px]">
            <div>
              <h3
                className={`${montserrat.variable} text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]`}
              >
                {vacancy.title}
              </h3>
              <div
                className="pr-4 desc-html leading-[38px] w-full text-[16px] text-[#A2A0B3] leading-[22px] text-justify font-inter break-words"
                dangerouslySetInnerHTML={{ __html: vacancy.description }}
              />
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
  const query = context.query.vacancyId;
  const res = await axios.get(
    `/${locale}/api/employee/vacancy/vacancy/${query}`
  );
  const data = await res.data;

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
      vacancy: data,
    },
  };
}
export default vacancyDetail;
