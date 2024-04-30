import axios from "../../../http";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import date_range from "../../../public/photos/main/date_range.svg";
import red_eye from "../../../public/photos/main/red_eye.svg";
import Pagination from "../../../components/Pagination";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../../next-i18next.config";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import { useSearchParams, usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const page = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t } = useTranslation("index");
  const { locale } = useRouter();
  const [wisdom, setwisdom] = useState([]);
  const [count, setCount] = useState("");
  const [currentPage, setCurrentPage] = useState(router.query.page || 1);
  const [postsPerPage] = useState(9);
  const [indexOfLastPost, setindexOfLastPost] = useState("");
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const getwisdom = async () => {
    const response = await axios.get(
      `/${locale}/api/information_service/informationServiceBySlug/?submenu_slug=/info_service/language_identity&page=${currentPage}&page_size=${postsPerPage}`
    );
    const wisdom = response.data.results;
    const count = response.data.count;
    setCount(count);
    const indexOfLastPost = Math.ceil(count / postsPerPage);
    setindexOfLastPost(indexOfLastPost);
    setwisdom(wisdom);
    router.push(router.pathname + "?" + "page=" + currentPage);
  };
  const previousPage = async () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
    const response = await axios.get(
      `/${locale}/api/information_service/informationServiceBySlug/?submenu_slug=/info_service/language_identity&page=${currentPage}&page_size=${postsPerPage}`
    );
    const wisdom = response.data.results;
    setwisdom(wisdom);
    window.scrollTo(0, 0);
    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
    router.push(pathname + "?" + createQueryString("page", currentPage));
  };
  const nextPage = async () => {
    if (currentPage !== Math.ceil(count / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
    const response = await axios.get(
      `/${locale}/api/information_service/informationServiceBySlug/?submenu_slug=/info_service/language_identity&page=${currentPage}&page_size=${postsPerPage}`
    );
    const wisdom = response.data.results;
    setwisdom(wisdom);
    window.scrollTo(0, 0);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
    router.push(pathname + "?" + createQueryString("page", currentPage + 1));
  };
  const paginate = async (currentPage) => {
    const response = await axios.get(
      `/${locale}/api/information_service/informationServiceBySlug/?submenu_slug=/info_service/language_identity&page=${currentPage}&page_size=${postsPerPage}`
    );
    setCurrentPage(currentPage);
    const wisdom = response.data.results;
    setwisdom(wisdom);
    window.scrollTo(0, 0);
    router.push(pathname + "?" + createQueryString("page", currentPage));
  };
  const lastPage = async (total) => {
    const response = await axios.get(
      `/${locale}/api/information_service/informationServiceBySlug/?submenu_slug=/info_service/language_identity&page=${total}&page_size=${postsPerPage}`
    );
    setCurrentPage(total);
    const wisdom = response.data.results;
    setwisdom(wisdom);
    window.scrollTo(0, 0);
    router.push(pathname + "?" + createQueryString("page", indexOfLastPost));
  };
  useEffect(() => {
    getwisdom();
  }, []);

  return (
    <div>
      <Head>
        <title>{t("page-titles.info-service.lang-identity")}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px]">
          <div className="2xl:basis-3/4 basis-full w-full pl-[20px] 2xl:pl-0 mb-[20px]">
            <h3
              className={`${montserrat.variable} font-montserrat font-semibold text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]`}
            >
              {t("page-titles.info-service.lang-identity")}
            </h3>
            {wisdom.length === 0 ? (
              ""
            ) : (
              <div>
                <ul className="flex items-center justify-start flex-wrap">
                  {wisdom.map((r) => (
                    <li
                      key={r.id}
                      className="py-[16px] block w-[342px] mx-[8px]"
                    >
                      <Link
                        href={`/info_service/language_identity/${r.id}`}
                        className=""
                      >
                        <Image
                          className="w-[342px] h-[200px] object-cover"
                          src={r.images[0].photo}
                          alt={r.title}
                          width={342}
                          height={200}
                        />
                        <p className="mb-[10px] h-[84px] pt-[10px] hover:text-[#3D8DFF] max-h-[84px] font-semibold font-montserrat text-white text-[1.25em] leading-[28px] line-clamp-3">
                          {r.title}
                        </p>
                        <div className="flex items-center justify-self-end">
                          <div className="flex items-center mr-[10px]">
                            <Image
                              className="mr-[5px]"
                              src={date_range}
                              alt={date_range}
                            />
                            <p className="text-[#A2A0B3]">
                              {dayjs(r.date).format("DD.MM.YYYY")}
                            </p>
                          </div>
                          <p className="mr-[5px] text-[#A2A0B3]"> | </p>
                          <div className="flex items-center">
                            <Image
                              className="mr-[5px]"
                              src={red_eye}
                              alt="red eye"
                            />
                            <p className="text-[#A2A0B3]">{r.view_count}</p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={count}
                  paginate={paginate}
                  previousPage={previousPage}
                  nextPage={nextPage}
                  currentPage={currentPage}
                  maxPageNumberLimit={maxPageNumberLimit}
                  minPageNumberLimit={minPageNumberLimit}
                />
              </div>
            )}
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
