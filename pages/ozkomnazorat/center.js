import axios from "../../http";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../next-i18next.config";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import Sidebar from "@/components/Sidebar";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const page = ({ center }) => {
  return (
    <div>
      <Head>
        <title>{center.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={center.title} />
        <meta property="og:title" content={center.title} key="title" />
        <meta name="title" content={center.title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gis.uz/ozkomnazorat/center" />
        <meta property="og:title" content="Oʻzkomnazorat" />
        <meta property="og:description" content={center.title} />
        <meta
          property="twitter:url"
          content="https://gis.uz/ozkomnazorat/center"
        />
        <meta property="twitter:title" content="`Oʻzkomnazorat" />
        <meta property="twitter:description" content={center.title} />
        <meta property="og:title" content={center.title} key="title" />
      </Head>
      <div className="container">
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px]">
          <div className="2xl:basis-3/4 basis-full w-full pl-[20px] 2xl:pl-0 mb-[20px] mr-[30px]">
            <div>
              <h3
                className={`${montserrat.variable} text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]`}
              >
                {center.title}
              </h3>
              <div
                className="pr-[40px] desc-html leading-[38px] w-full text-[16px] text-[#A2A0B3] leading-[22px] text-justify font-inter break-words"
                dangerouslySetInnerHTML={{ __html: center.description }}
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
  console.log(context, "context");
  const locale = context.locale;
  const res = await axios(
    `/${locale}/api/about/aboutBySubmenuSlug/?submenu_slug=/ozkomnazorat/center`
  );
  const data = await res.data[0];
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
      center: data,
    },
  };
}
export default page;
