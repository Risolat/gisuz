import axios from "../../http";
import { useEffect, useState } from "react";
import Link from "next/link";
import Paginate from "../../components/Paginate.js";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../next-i18next.config";

const page = () => {
  const { t } = useTranslation("index");
  const { locale } = useRouter();
  const [title, setTitle] = useState();
  const [submenu, setSubmenu] = useState([]);
  const [cabmin_decisions, setcabmin_decisions] = useState([]);
  const [count, setCount] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);
  const [indexOfLastPost, setindexOfLastPost] = useState("");
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

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

  const getcabmin_decisions = async () => {
    const response = await axios.get(
      `/${locale}/api/documents/documentPostBySubmenuSlug/?submenu_slug=/documents/cabmin_decisions&title&year&page=${currentPage}&page_size=${postsPerPage}`
    );
    const cabmin_decisions = response.data.results;
    const count = response.data.count;
    setCount(count);
    const indexOfLastPost = Math.ceil(count / postsPerPage);
    setindexOfLastPost(indexOfLastPost);
    setcabmin_decisions(cabmin_decisions);
  };
  const previousPage = async () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
    const response = await axios.get(
      `/${locale}/api/documents/documentPostBySubmenuSlug/?submenu_slug=/documents/cabmin_decisions&title&year&page=${currentPage}&page_size=${postsPerPage}`
    );
    const cabmin_decisions = response.data.results;
    setcabmin_decisions(cabmin_decisions);
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
    const response = await axios.get(
      `/${locale}/api/documents/documentPostBySubmenuSlug/?submenu_slug=/documents/cabmin_decisions&title&year&page=${currentPage}&page_size=${postsPerPage}`
    );
    const cabmin_decisions = response.data.results;
    setcabmin_decisions(cabmin_decisions);
    window.scrollTo(0, 0);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  const paginate = async (currentPage) => {
    const response = await axios.get(
      `/${locale}/api/documents/documentPostBySubmenuSlug/?submenu_slug=/documents/cabmin_decisions&title&year&page=${currentPage}&page_size=${postsPerPage}`
    );
    setCurrentPage(currentPage);
    const cabmin_decisions = response.data.results;
    setcabmin_decisions(cabmin_decisions);
    window.scrollTo(0, 0);
  };
  const lastPage = async (total) => {
    const response = await axios.get(
      `/${locale}/api/documents/documentPostBySubmenuSlug/?submenu_slug=/documents/cabmin_decisions&title&year&page=${currentPage}&page_size=${postsPerPage}`
    );
    setCurrentPage(total);
    const cabmin_decisions = response.data.results;
    setcabmin_decisions(cabmin_decisions);
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    getData();
    getcabmin_decisions();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px]">
          <div className="2xl:basis-3/4 basis-full w-full pl-[20px] 2xl:pl-0 mb-[20px] pr-[20px] px-[20px]">
            <h3 className="text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]">
              {t("page-titles.documents.cabmin-decisions")}
            </h3>
            <div className="flex flex-col mt-[20px] pr-[16px]">
              {cabmin_decisions.map((r) => (
                <div key={r.id} className="gradientBox">
                  <div className="border-[#3A2F7D] border-y-[2px] hover:bg-[#24224E] w-full bg-[#171142]">
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
          </div>
          <div className="sticky top-[160px] 2xl:w-[350px] w-full 2xl:basis-1/4 basis-full mx-[20px] 2xl:mx-0 py-[8px] bg-[#3A2F7D]">
            <p className="mb-[24px] text-[20px] px-[16px]">{title}</p>
            <ul className="">
              {submenu.map((item) => (
                <li key={item.id} className="bg-[#3A2F7D]">
                  {item.slug === "/documents/cabmin_decisions" ? (
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
      ...(await serverSideTranslations(
        locale,
        ["common", "index", "navbar"],
        i18nextConfig
      )),
    },
  };
}
export default page;
