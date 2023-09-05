import axios from "../../http";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Paginate from "../../components/Paginate.js";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../next-i18next.config";
import { Montserrat } from "next/font/google";
import Head from "next/head";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const page = () => {
  const { t } = useTranslation("common");
  const { locale } = useRouter();
  const [submenu, setSubmenu] = useState([]);
  const [title, setTitle] = useState();
  const [gov_standarts, setgov_standarts] = useState([]);
  const [year, setYear] = useState("");
  const [date, setdate] = useState(null);
  const [input, setInput] = useState("");
  const [count, setCount] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);
  const [indexOfLastPost, setindexOfLastPost] = useState("");
  const [pageNumberLimit, setpageNumberLimit] = useState(9);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const renderYearContent = (year) => {
    const tooltipText = `Tooltip for year: ${year}`;
    return <span title={tooltipText}>{year}</span>;
  };
  const handleDate = async (date) => {
    setdate(date);
    const year = date.toISOString().slice(0, 4);
    setYear(year);
    const response = await axios.get(
      `/${locale}/api/documents/documents/stateStandartsBySubmenuSlug/?submenu_slug=/documents/gov_standarts&page=${currentPage}&title=${input}&year=${year}&page_size=${postsPerPage}`
    );
    const gov_standarts = response.data.results;
    setgov_standarts(gov_standarts);
    window.scrollTo(0, 0);
  };
  const handleInput = async (event) => {
    const input = event.target.value;
    setInput(input);
    getgov_standarts();
  };
  const previousPage = async () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
    getgov_standarts();
    window.scrollTo(0, 0);
    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  const nextPage = async () => {
    if (currentPage !== Math.ceil(count / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
    getgov_standarts();
    window.scrollTo(0, 0);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  const paginate = async (currentPage) => {
    const response = await axios.get(
      `/${locale}/api/documents/documents/stateStandartsBySubmenuSlug/?submenu_slug=/documents/gov_standarts&page=${currentPage}&title=${input}&year=${year}&page_size=${postsPerPage}`
    );
    const gov_standarts = response.data.results;
    setCurrentPage(currentPage);
    setgov_standarts(gov_standarts);
    const count = response.data.count;
    setCount(count);
    window.scrollTo(0, 0);
  };
  const lastPage = async (total) => {
    const response = await axios.get(
      `/${locale}/api/documents/documents/stateStandartsBySubmenuSlug/?submenu_slug=/documents/gov_standarts&page=${total}&title=${input}&year=${year}&page_size=${postsPerPage}`
    );
    setCurrentPage(total);
    const gov_standarts = response.data.results;
    setgov_standarts(gov_standarts);
    window.scrollTo(0, 0);
  };
  const getData = async () => {
    const response = await axios.get(`/${locale}/api/menu/`);
    const menuName = ["DOCUMENTS"];
    const data = response.data.filter((category) =>
      menuName.includes(category.name)
    );
    const title = data.map((d) => {
      return d.title;
    });
    setTitle(title);
    setSubmenu(data[0].submenu);
  };

  const getgov_standarts = async () => {
    const response = await axios.get(
      `/${locale}/api/documents/documents/stateStandartsBySubmenuSlug/?submenu_slug=/documents/gov_standarts&page=${currentPage}&title=${input}&year=${year}&page_size=${postsPerPage}`
    );
    const gov_standarts = response.data.results;
    setgov_standarts(gov_standarts);
    const count = response.data.count;
    setCount(count);
    const indexOfLastPost = Math.ceil(count / postsPerPage);
    setindexOfLastPost(indexOfLastPost);
  };
  const clearInput = () => {
    let inp = document.getElementById("input");
    inp.value = "";
  };
  const clearDate = async () => {
    let inpDate = document.getElementById("date");
    location.reload();
    inpDate.value = " ";
  };
  useEffect(() => {
    getData();
    getgov_standarts();
  }, []);

  return (
    <div>
      <Head>
        <title>{t("page-titles.documents.gov-standarts")}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px]">
          <div className="2xl:basis-3/4 basis-full w-full pl-[20px] 2xl:pl-0 mb-[20px] pr-[20px] px-[20px] mr-[30px]">
            <h3
              className={`${montserrat.variable} text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]`}
            >
              {t("page-titles.documents.gov-standarts")}
            </h3>
            <div className="w-full flex items-start">
              <label className="w-full mr-[10px] relative">
                <input
                  id="input"
                  type="text"
                  name="input"
                  onChange={(event) => handleInput(event)}
                  className="w-full py-[13px] pl-[50px] border-slate-200 placeholder-slate-400 bg-[#3A2F7D] contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
                />
                <Icon
                  icon="iconamoon:search-light"
                  color="#a2a0b3"
                  width="16"
                  height="16"
                  className="absolute top-[37%] left-[15px]"
                />
                <Icon
                  onClick={() => clearInput()}
                  icon="ic:round-clear"
                  color="#a2a0b3"
                  width="25"
                  height="25"
                  className="absolute top-[25%] right-[10px]"
                />
              </label>
              <div className="relative w-full">
                <DatePicker
                  id="date"
                  className="w-full py-[13px] px-[50px] border-slate-200"
                  selected={date}
                  renderYearContent={renderYearContent}
                  showYearPicker
                  dateFormat="yyyy"
                  onChange={(date) => handleDate(date)}
                  autocomplete="off"
                />
                <Icon
                  onClick={() => clearDate()}
                  icon="ic:round-clear"
                  color="#a2a0b3"
                  width="25"
                  height="25"
                  className="absolute top-[25%] right-[10px]"
                />
              </div>
            </div>
            <div className="flex flex-col mt-[20px] pr-[16px]">
              {gov_standarts.length === 0
                ? t("other.no-data")
                : gov_standarts.map((r) => (
                    <div key={r.id} className="gradientBox">
                      <div className="bg-color border-[#3A2F7D] border-y-[2px] hover:bg-[#24224E] w-full">
                        <p className="text-[1.12rem]  py-[16px] px-[8px]">
                          <Link
                            className="text-[#A2A0B3]"
                            href={`${r.link}`}
                            target="_blank"
                          >
                            {r.title}
                          </Link>
                        </p>
                      </div>
                    </div>
                  ))}
            </div>
            {gov_standarts.length === 0 ? (
              ""
            ) : (
              <Paginate
                postsPerPage={postsPerPage}
                totalPosts={count}
                paginate={paginate}
                previousPage={previousPage}
                nextPage={nextPage}
                currentPage={currentPage}
                total={indexOfLastPost}
                maxPageNumberLimit={maxPageNumberLimit}
                minPageNumberLimit={minPageNumberLimit}
                pageNumberLimit={pageNumberLimit}
                lastPage={lastPage}
              />
            )}
          </div>
          <div className="sticky top-[160px] mt-[85px] 2xl:w-[350px] w-full 2xl:basis-1/4 basis-full mx-[20px] 2xl:mx-0 py-[8px] bg-[#3A2F7D]">
            <p
              className={`${montserrat.variable} font-semibold font-montserrat mb-[24px] text-[1.12rem] px-[16px]`}
            >
              {title}
            </p>
            <ul className="">
              {submenu.map((item) => (
                <li key={item.id} className="bg-[#3A2F7D]">
                  {item.slug === "/documents/gov_standarts" ? (
                    <div className="gradientBox  bg-[#3A2F7D]">
                      <Link
                        className="block py-[10px] px-[16px] mx-[3px] hover:bg-[#24224E] bg-[#171142] text-white"
                        href={`${item.slug == null ? item.link : item.slug}`}
                        target={`${item.slug == null ? "__blank" : "_self"}`}
                      >
                        {item.title}
                      </Link>
                    </div>
                  ) : (
                    <div className="gradientBox bg-[#3A2F7D]">
                      <Link
                        className="block py-[10px] px-[16px] hover:bg-[#24224E] hover:text-white bg-[#3A2F7D] text-[#A2A0B3]"
                        locale={locale}
                        href={`${item.slug == null ? item.link : item.slug}`}
                        target={`${item.slug == null ? "__blank" : "_self"}`}
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
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
    },
  };
}
export default page;
