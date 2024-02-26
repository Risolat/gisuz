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

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const page = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t } = useTranslation("common");
  const { locale } = useRouter();
  const [title, setTitle] = useState();
  const [submenu, setSubmenu] = useState([]);
  const [open_data, setopen_data] = useState([]);
  const [toggleState, setToggleState] = useState(1);
  const [tab2, setTab2] = useState([]);

  const toggleTab = (toggleState) => {
    setToggleState(toggleState);
  };

  const getData = async () => {
    const response = await axios.get(`/${locale}/api/menu/`);

    const menuName = ["INTERACTIVE_SERVICES"];

    const data = response.data.filter((category) =>
      menuName.includes(category.name)
    );
    const title = data.map((d) => {
      return d.title;
    });
    setTitle(title);
    setSubmenu(data[0].submenu);
  };

  const getopen_data = async () => {
    const response = await ax.get(
      `https://data.egov.uz/apiClient/main/gettable?orgId=377&limit=10&sortType=1&offset=0`
    );
    const open_data = response.data.result.data;
    setopen_data(open_data);
  };
  const getTab2 = async () => {
    const response = await axios.get(
      `${locale}/api/open_data/openDataBySubmenuSlug/?submenu_slug=/interactive_service/open_data`
    );
    const tab2 = response.data;
    setTab2(tab2);
  };

  useEffect(() => {
    getData();
    getopen_data();
    getTab2();
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
              <div className={toggleState === 2 ? "block" : "hidden"}>
                {tab2.map((t) => (
                  <div
                    key={t.id}
                    className="card p-[20px] bg-[#3A2F7D] mr-[30px] mb-[20px] rounded-lg"
                  >
                    <p className="cursor-pointer pb-[20px] text-[0.825em] xl:text-[1.285em] text-[#8F8F8F] font-montserrat">
                      {t.title}
                    </p>
                    <div>
                      <p className="mb-[10px]">{t.sub_menu}</p>
                      <div className="flex justify-between items-end">
                        <div className="flex items-center">
                          <Link
                              href={t.file}
                              target="_blank"
                              className="px-[10px] py-[5px] mx-[5px] text-[#8F8F8F]"
                              download
                          >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnXlink="http://www.w3.org/1999/xlink"
                                aria-hidden="true"
                                role="img"
                                width="20%"
                                height="20%"
                                preserveAspectRatio="xMidYMid meet"
                                viewBox="0 0 512 512"
                            >
                              <path
                                  fill="#8F8F8F"
                                  d="M0 64C0 28.7 28.7 0 64 0h160v128c0 17.7 14.3 32 32 32h128v144H176c-35.3 0-64 28.7-64 64v144H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0l128 128zM176 352h32c30.9 0 56 25.1 56 56s-25.1 56-56 56h-16v32c0 8.8-7.2 16-16 16s-16-7.2-16-16V368c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24h-16v48h16zm96-80h32c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48h-32c-8.8 0-16-7.2-16-16V368c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16v-64c0-8.8-7.2-16-16-16h-16v96h16zm80-112c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16s-7.2 16-16 16h-32v32h32c8.8 0 16 7.2 16 16s-7.2 16-16 16h-32v48c0 8.8-7.2 16-16 16s-16-7.2-16-16V368z"
                              ></path>
                            </svg>
                          </Link>
                        </div>
                        <p className="flex items-end justify-end p-3 text-[18px] text-[#A2A0B3]">{dayjs(t.updated_at).format("DD.MM.YYYY")}</p>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="sticky top-[160px] 2xl:w-[350px] w-full 2xl:basis-1/4 basis-full mx-[20px] 2xl:mx-0 py-[8px] bg-[#3A2F7D]">
            <p
              className={`${montserrat.variable} font-semibold font-montserrat mb-[24px] text-[1.12rem] px-[16px]`}
            >
              {title}
            </p>
            <ul className="">
              {submenu.map((item) => (
                <li key={item.id} className="bg-[#3A2F7D]">
                  {item.slug === "/interactive_service/open_data" ? (
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
