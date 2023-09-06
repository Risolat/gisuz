import axios from "../../../http";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import date_range from "../../../public/photos/main/date_range.svg";
import red_eye from "../../../public/photos/main/red_eye.svg";
import noPhoto from "../../../public/photos/icons/no-photo.svg";
import Pagination from "../../../components/Pagination";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../../next-i18next.config";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import { useSearchParams, usePathname } from "next/navigation";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const page = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [title, setTitle] = useState();
  const [submenu, setSubmenu] = useState([]);
  const [ads, setads] = useState([]);
  const [count, setCount] = useState("");
  const [currentPage, setCurrentPage] = useState(router.query.page || 1);
  const [postsPerPage] = useState(9);
  const [indexOfLastPost, setindexOfLastPost] = useState("");
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const { t } = useTranslation("common");
  const { locale } = useRouter();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const getData = async () => {
    const response = await axios.get(`/${locale}/api/menu/`);

    const menuName = ["INFORMATION_SERVICE"];

    const data = response.data.filter((category) =>
      menuName.includes(category.name)
    );

    const title = data.map((d) => {
      return d.title;
    });
    setTitle(title);
    setSubmenu(data[0].submenu);
  };

  const getads = async () => {
    const response = await axios.get(
      `/${locale}/api/information_service/informationServiceBySlug/?submenu_slug=/info_service/ads&page=${currentPage}&page_size=${postsPerPage}`
    );
    const ads = response.data.results;
    const count = response.data.count;
    setCount(count);
    const indexOfLastPost = Math.ceil(count / postsPerPage);
    setindexOfLastPost(indexOfLastPost);
    setads(ads);
    router.push(router.pathname + "?" + "page=" + currentPage);
  };
  const previousPage = async () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
    const response = await axios.get(
      `/${locale}/api/information_service/informationServiceBySlug/?submenu_slug=/info_service/ads&page=${currentPage}&page_size=${postsPerPage}`
    );
    const ads = response.data.results;
    setads(ads);
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
      `/${locale}/api/information_service/informationServiceBySlug/?submenu_slug=/info_service/ads&page=${currentPage}&page_size=${postsPerPage}`
    );
    const ads = response.data.results;
    setads(ads);
    window.scrollTo(0, 0);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
    router.push(pathname + "?" + createQueryString("page", currentPage + 1));
  };
  const paginate = async (currentPage) => {
    const response = await axios.get(
      `/${locale}/api/information_service/informationServiceBySlug/?submenu_slug=/info_service/ads&page=${currentPage}&page_size=${postsPerPage}`
    );
    setCurrentPage(currentPage);
    // $cookiz.set("currentPage", cur);
    const ads = response.data.results;
    setads(ads);
    window.scrollTo(0, 0);
    router.push(pathname + "?" + createQueryString("page", currentPage));
  };
  const lastPage = async (total) => {
    const response = await axios.get(
      `/${locale}/api/information_service/informationServiceBySlug/?submenu_slug=/info_service/ads&page=${total}&page_size=${postsPerPage}`
    );
    setCurrentPage(total);
    const ads = response.data.results;
    setads(ads);
    window.scrollTo(0, 0);
    router.push(pathname + "?" + createQueryString("page", indexOfLastPost));
  };
  useEffect(() => {
    getData();
    getads();
  }, []);

  return (
    <div>
      <Head>
        <title>{t("page-titles.info-service.ads")}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={`${montserrat.variable} container font-montserrat`}>
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px]">
          <div className="2xl:basis-3/4 basis-full w-full pl-[20px] 2xl:pl-0 mb-[20px]">
            <h3 className="text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[32px]">
              {t("page-titles.info-service.ads")}
            </h3>
            {ads.length === 0 ? (
              ""
            ) : (
              <div>
                {" "}
                <ul className="pr-[16px] flex items-start justify-center xl:justify-start flex-wrap ">
                  {ads.map((r) => (
                    <li
                      key={r.id}
                      className="py-[16px] block w-[342px] mx-[5px] 2xl:mx-[5px]"
                    >
                      <Link href={`/info_service/ads/${r.id}`} className="">
                        {r.images != 0 ? (
                          <Image
                            className="w-[342px] h-[200px] mb-[5px]"
                            src={r.images[0].photo}
                            alt={r.title}
                            width={342}
                            height={200}
                          />
                        ) : (
                          <Image
                            className="w-[342px] h-[200px] mb-[5px]"
                            src={noPhoto}
                            alt={r.title}
                            width={342}
                            height={200}
                          />
                        )}
                        {r.category === null ? (
                          ""
                        ) : (
                          <span className="inline-block py-[4px] px-[16px] text-white font-inter text-[1em] bg-[#3A2F7D]">
                            {r.category}
                          </span>
                        )}

                        <p className="mb-[10px] h-[84px] hover:text-[#3D8DFF] max-h-[84px] font-semibold font-montserrat text-white text-[1.25em] leading-[28px] line-clamp-3">
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
                </ul>
              </div>
            )}
          </div>
          <div className="sticky top-[265px] 2xl:w-[350px] w-full 2xl:basis-1/4 basis-full mx-[20px] 2xl:mx-0  py-[8px] bg-[#3A2F7D]">
            <p className="mb-[24px] text-[20px] px-[16px] font-montserrat font-semibold ">
              {title}
            </p>
            <ul className="">
              {submenu.map((item) => (
                <li key={item.id} className="bg-[#3A2F7D]">
                  {item.slug === "/info_service/ads" ? (
                    <div className="gradientBox  bg-[#3A2F7D]">
                      <Link
                        className="block py-[10px] px-[16px] font-inter mx-[3px] hover:bg-[#24224E] bg-[#171142] text-white"
                        href={`${item.slug}`}
                      >
                        {item.title}
                      </Link>
                    </div>
                  ) : (
                    <div className="gradientBox bg-[#3A2F7D]">
                      <Link
                        className="block py-[10px] px-[16px] font-inter hover:bg-[#24224E] hover:text-white bg-[#3A2F7D] text-[#A2A0B3]"
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
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
    },
  };
}
export default page;
