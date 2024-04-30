import axios from "../../http";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import ax from "axios";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../next-i18next.config";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import { useSearchParams, usePathname } from "next/navigation";
import dayjs from "dayjs";
import Sidebar from "@/components/Sidebar";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const page = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { locale } = useRouter();
  const [open_data, setopen_data] = useState([]);
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (toggleState) => {
    setToggleState(toggleState);
  };

  const getopen_data = async () => {
    const response = await ax.get(
      `https://data.egov.uz/apiClient/main/gettable?orgId=377&limit=10&sortType=1&offset=0`
    );
    const open_data = response.data.result.data;
    setopen_data(open_data);
    console.log(response);
  };

  useEffect(() => {
    getopen_data();
  }, []);

  return (
    <div>
      <Head>
        <title>{t("interactive-services.open-data")}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px]">
          <div className="2xl:basis-3/4 basis-full w-full pl-[20px] 2xl:pl-0 mb-[20px] pr-[20px] px-[20px]">
            <h3
              className={`${montserrat.variable} text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]`}
            >
              {t("interactive-services.open-data")}
            </h3>
            <div className="block-tabs">
              <div
                className={
                  toggleState === 1
                    ? "tabs active-tabs mr-[20px] "
                    : "tabs text-[#8F8F8F]"
                }
                onClick={() => toggleTab(1)}
              >
                {t("form.interactive-service.open-data")}
              </div>
              <div
                className={
                  toggleState === 2
                    ? "tabs active-tabs "
                    : "tabs text-[#8F8F8F]"
                }
                onClick={() => router.push("/openData")}
              >
                {t("form.interactive-service.custom-open-data")}
              </div>
            </div>

            <div className="content-tabs">
              <div className={toggleState === 1 ? "block" : "hidden"}>
                {open_data.map((d) => (
                  <Link
                    key={d.structId}
                    target="_blank"
                    href={`https://data.egov.uz/data/${d.structId}`}
                  >
                    <div className="card p-[20px] bg-[#3A2F7D] mr-[30px] mb-[20px] rounded-lg">
                      <p className="cursor-pointer pb-[20px] text-[0.825em] xl:text-[1.285em] text-[#8F8F8F] font-montserrat">
                        {locale === "uz"
                          ? d.dataName.uzbText
                          : locale === "ru"
                          ? d.dataName.rusText
                          : locale === "uzb"
                          ? d.dataName.uzbKrText
                          : d.dataName.engText}
                      </p>
                      <p className="cursor-pointer text-white text-[.7em] xl:text-[1.2em] my-[12px]">
                        {locale === "uz"
                          ? d.orgName.uzbText
                          : locale === "ru"
                          ? d.orgName.rusText
                          : locale === "uzb"
                          ? d.orgName.uzbKrText
                          : d.orgName.engText}
                      </p>

                      <p className="text-[#8F8F8F] text-[1.15em] xl:text-[1.5em] font-bold mb-[10px]">
                        {d.name}
                      </p>
                      <div className="flex justify-between flex-wrap">
                        <p>
                          {locale === "uz"
                            ? d.sphereName.uzbText
                            : locale === "ru"
                            ? d.sphereName.rusText
                            : locale === "uzb"
                            ? d.sphereName.uzbKrText
                            : d.sphereName.engText}
                        </p>
                        <div className="flex items-center flex-wrap mt-[10px]">
                          <Link
                            href={`https://data.egov.uz/apiData/MainData/GetByFile?id=${d.structId}&fileType=2&tableType=2`}
                            className="px-[10px] py-[5px] mx-[5px] border-[#5C587A] border-[1px] text-[#8F8F8F]"
                          >
                            xml
                          </Link>
                          <Link
                            href={`https://data.egov.uz/apiData/MainData/GetByFile?id=${d.structId}&fileType=4&tableType=2`}
                            className="px-[10px] py-[5px] mx-[5px] border-[#5C587A] border-[1px] text-[#8F8F8F]"
                          >
                            csv
                          </Link>
                          <Link
                            href={`https://data.egov.uz/apiData/MainData/GetByFile?id=${d.structId}&fileType=1&tableType=2`}
                            className="px-[10px] py-[5px] mx-[5px] border-[#5C587A] border-[1px] text-[#8F8F8F]"
                          >
                            json
                          </Link>
                          <Link
                            href={`https://data.egov.uz/apiData/MainData/GetByFile?id=${d.structId}&fileType=3&tableType=2`}
                            className="px-[10px] py-[5px] mx-[5px] border-[#5C587A] border-[1px] text-[#8F8F8F]"
                          >
                            xls
                          </Link>
                          <Link
                            href={`https://data.egov.uz/apiData/MainData/GetByFile?id=${d.structId}&fileType=5&tableType=2`}
                            className="px-[10px] py-[5px] mx-[5px] border-[#5C587A] border-[1px] text-[#8F8F8F]"
                          >
                            rdf
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className={toggleState === 2 ? "block" : "hidden"}></div>
            </div>
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ["common", "index", "navbar"],
        i18nextConfig
      )),
    },
  };
}
export default page;
