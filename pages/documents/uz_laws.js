import axios from "../../http";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Pagination from "../../components/Pagination";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../next-i18next.config";
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
  const [laws, setlaws] = useState([]);
  const [count, setCount] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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

  const getlaws = async () => {
    const response = await axios.get(
      `/${locale}/api/documents/documentPostBySubmenuSlug/?submenu_slug=/documents/uz_laws&title&year&page=${currentPage}&page_size=${postsPerPage}`
    );
    const laws = response.data.results;
    const count = response.data.count;
    setCount(count);
    const indexOfLastPost = Math.ceil(count / postsPerPage);
    setindexOfLastPost(indexOfLastPost);

    setlaws(laws);
    router.push(pathname + "?" + createQueryString("page", currentPage));
  };
  const previousPage = async () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
    const response = await axios.get(
      `/${locale}/api/documents/documentPostBySubmenuSlug/?submenu_slug=/documents/uz_laws&title&year&page=${currentPage}&page_size=${postsPerPage}`
    );
    const laws = response.data.results;
    setlaws(laws);
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
      `/${locale}/api/documents/documentPostBySubmenuSlug/?submenu_slug=/documents/uz_laws&title&year&page=${currentPage}&page_size=${postsPerPage}`
    );
    const laws = response.data.results;
    setlaws(laws);
    window.scrollTo(0, 0);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
    router.push(pathname + "?" + createQueryString("page", currentPage));
  };
  const paginate = async (currentPage) => {
    const response = await axios.get(
      `/${locale}/api/documents/documentPostBySubmenuSlug/?submenu_slug=/documents/uz_laws&title&year&page=${currentPage}&page_size=${postsPerPage}`
    );
    setCurrentPage(currentPage);
    const laws = response.data.results;
    setlaws(laws);
    window.scrollTo(0, 0);
    router.push(pathname + "?" + createQueryString("page", currentPage));
  };
  const lastPage = async (total) => {
    const response = await axios.get(
      `/${locale}/api/documents/documentPostBySubmenuSlug/?submenu_slug=/documents/uz_laws&title&year&page=${currentPage}&page_size=${postsPerPage}`
    );
    setCurrentPage(total);
    const laws = response.data.results;
    setlaws(laws);
    window.scrollTo(0, 0);
    router.push(pathname + "?" + createQueryString("page", indexOfLastPost));
  };

  useEffect(() => {
    getlaws();
  }, []);

  return (
    <div>
      <Head>
        <title>{t("page-titles.documents.uz-laws")}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px]">
          <div className="2xl:basis-3/4 basis-full w-full pl-[20px] 2xl:pl-0 mb-[20px] pr-[20px] px-[20px]">
            <h3
              className={`${montserrat.variable} text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]`}
            >
              {t("page-titles.documents.uz-laws")}
            </h3>
            <div className="flex flex-col mt-[20px] pr-[16px]">
              {laws.map((r) => (
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
