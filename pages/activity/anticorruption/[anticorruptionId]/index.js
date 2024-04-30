import axios from "../../../../http";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../../../next-i18next.config";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import Sidebar from "@/components/Sidebar";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const anticorruptionDetail = ({ anticorruption }) => {
  const { t } = useTranslation("common");
  return (
    <div>
      <Head>
        <title>{anticorruption.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px]">
          <div className="2xl:basis-3/4 basis-full w-full pl-[20px] 2xl:pl-0 mb-[20px]">
            <div>
              <h3
                className={`${montserrat.variable} text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]`}
              >
                {anticorruption.title}
              </h3>
              <div
                className="pr-[40px] desc-html leading-[38px] w-full text-[16px] text-[#A2A0B3] leading-[22px] text-justify font-inter break-words"
                dangerouslySetInnerHTML={{ __html: anticorruption.description }}
              />
              {anticorruption.file === null ? (
                ""
              ) : (
                <a
                  href={anticorruption.file}
                  className="inline-block mt-[20px] hover:bg-white hover:text-[#171142] font-bold tracking-[1px] text-white border border-text_secondary px-[20px] py-[12px]"
                  target="_blank"
                  download
                >
                  {t("button.download-document")}
                </a>
              )}

              <div className="flex item-center"></div>
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
  const query = context.query.anticorruptionId;
  const res = await axios(`/${locale}/api/activity/${query}`);
  const data = await res.data;

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
      anticorruption: data,
    },
  };
}
export default anticorruptionDetail;
