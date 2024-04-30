import axios from "../../http";
import Link from "next/link";
import Image from "next/image";
import axbUser from "../../public/photos/main/axb.jpeg";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../next-i18next.config";
import { useTranslation } from "next-i18next";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import Sidebar from "@/components/Sidebar";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const page = ({ about, locale }) => {
  const { t } = useTranslation("common");
  return (
    <div>
      <Head>
        <title>{about.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={about.title} />
        <meta property="og:title" content={about.title} key="title" />
        <meta name="title" content={about.title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gis.uz/info_service/about" />
        <meta property="og:title" content="Oʻzkomnazorat" />
        <meta property="og:description" content={about.title} />
        <meta
          property="twitter:url"
          content="https://gis.uz/info_service/about"
        />
        <meta property="twitter:title" content={`Oʻzkomnazorat`} />
        <meta property="twitter:description" content={about.title} />
        <meta property="og:title" content={about.title} key="title" />
      </Head>
      <div className="container">
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px]">
          <div className="2xl:basis-3/4 basis-full w-full pl-[20px] 2xl:pl-0 mb-[20px] pr-[20px]">
            <div className="px-[16px]">
              <h3
                className={`${montserrat.variable} font-montserrat font-semibold text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]`}
              >
                {about.title}
              </h3>
              <Image
                src={axbUser}
                alt="image"
                width={264}
                height={396}
                className="mb-[20px]"
              />

              <div className="text-[16px] text-[#A2A0B3] leading-[22px">
                <p className="pb-[10px] font-bold text-[18px]">
                  {locale === "uz"
                    ? "Masharipova Ruxsora Olimjonovna"
                    : locale === "ru"
                    ? "Машарипова Рухсора Алимжановна"
                    : locale === "uzb"
                    ? "Машарипова Рухсора Алимжановна"
                    : "Masharipova Ruxsora Olimjonovna"}
                </p>
                <p className="pb-[10px]">
                  <b>
                    <span>{t("card.address")}: </span>
                  </b>
                  <span>{t("navbar.address")}</span>
                </p>
                <p className="pb-[10px]">
                  <b>
                    <span>{t("card.phone")}: </span>
                  </b>
                  <span>+99871-202-6992, +99871-202-6974</span>
                </p>
                <p className="pb-[10px]">
                  <b>
                    <span>{t("card.email")}: </span>
                  </b>
                  <span>press@gis.uz</span>
                </p>
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
  const res = await axios(
    `/${locale}/api/information_service/additionalInfoBySlug/?submenu_slug=/info_service/about`
  );
  const data = await res.data.results[0];
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
      about: data,
      locale,
    },
  };
}
export default page;
