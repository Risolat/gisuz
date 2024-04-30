import axios from "../../http";
import Link from "next/link";
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

const page = ({ questions, locale }) => {
  return (
    <div>
      <Head>
        <title>
          {locale === "ru"
            ? "Часто задаваемые вопросы"
            : locale === "en"
            ? "FAQ"
            : questions[0].sub_menu}
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px]">
          <div className="2xl:basis-3/4 basis-full w-full pl-[20px] 2xl:pl-0 mb-[20px] pr-[20px]">
            <div className="px-[16px]">
              <h3
                className={`${montserrat.variable} font-montserrat font-semibold text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]`}
              >
                {locale === "ru"
                  ? "Часто задаваемые вопросы"
                  : locale === "en"
                  ? "FAQ"
                  : questions[0].sub_menu}
              </h3>
              <p className="pb-3 text-[18px] text-[#A2A0B3]">
                {dayjs(questions[0].updated_at).format("DD.MM.YYYY")}
              </p>
              <div
                className="pr-[40px] desc-html leading-[38px] w-divl text-[16px] text-[#A2A0B3] leading-[22px] text-justify font-inter break-words"
                dangerouslySetInnerHTML={{
                  __html:
                    locale === "ru"
                      ? ""
                      : locale === "en"
                      ? ""
                      : questions[0].description,
                }}
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
  const res = await axios(
    `/${locale}/api/information_service/informationServiceBySlug/?submenu_slug=/info_service/frequently-asked-questions`
  );
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
      questions: res.data.results,
      locale: locale,
    },
  };
}
export default page;
