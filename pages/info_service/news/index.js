import axios from "../../../http";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import date_range from "../../../public/photos/main/date_range.svg";
import red_eye from "../../../public/photos/main/red_eye.svg";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import arrow from "../../../public/photos/icons/arrow.svg";
import "react-datepicker/dist/react-datepicker.css";
import Paginate from "../../../components/Paginate.js";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../../next-i18next.config";

const page = () => {
  const { t } = useTranslation("common");
  const { locale } = useRouter();
  const [title, setTitle] = useState();
  const [submenu, setSubmenu] = useState([]);
  const [news, setnews] = useState([]);
  const [date, setDate] = useState(new Date());
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [selected, setselected] = useState("");
  const [categoryId, setcategoryId] = useState("");
  const [count, setCount] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);
  const [indexOfLastPost, setindexOfLastPost] = useState("");
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

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

  const getnews = async () => {
    const response = await axios.get(
      `/${locale}/api/information_service/informationServiceBySlug/?submenu_slug=/info_service/news&page=${currentPage}&page_size=${postsPerPage}`
    );
    const news = response.data.results;
    const count = response.data.count;
    setCount(count);
    const indexOfLastPost = Math.ceil(count / postsPerPage);
    setindexOfLastPost(indexOfLastPost);
    console.log(response, "DATA");
    setnews(news);
  };
  const previousPage = async () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
    const response = await axios.get(
      `/${locale}/api/information_service/informationServiceBySlug/?submenu_slug=/info_service/news&page=${currentPage}&page_size=${postsPerPage}`
    );
    const news = response.data.results;
    setnews(news);
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
      `/${locale}/api/information_service/informationServiceBySlug/?submenu_slug=/info_service/news&page=${currentPage}&page_size=${postsPerPage}`
    );
    const news = response.data.results;
    setnews(news);
    window.scrollTo(0, 0);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  const paginate = async (currentPage) => {
    const response = await axios.get(
      `/${locale}/api/information_service/informationServiceBySlug/?submenu_slug=/info_service/news&page=${currentPage}&page_size=${postsPerPage}`
    );

    setCurrentPage(currentPage);
    const news = response.data.results;
    setnews(news);
    window.scrollTo(0, 0);
  };
  const lastPage = async (total) => {
    const response = await axios.get(
      `/${locale}/api/information_service/informationServiceBySlug/?submenu_slug=/info_service/news&page=${total}&page_size=${postsPerPage}`
    );
    setCurrentPage(total);
    const news = response.data.results;
    setnews(news);
    window.scrollTo(0, 0);
  };
  const handleDate = async (date) => {
    setDate(date);
    const year = date.toISOString().slice(0, 4);
    const month = date.toISOString().slice(5, 7);
    const day = date.toISOString().slice(8, 10);
    setMonth(month);
    setYear(year);
    const response = await axios.get(
      `/${locale}/api/information_service/informationServiceBySlug/?submenu_slug=/info_service/news&page=${currentPage}&page_size=${postsPerPage}&category&month=${month}&year=${year}`
    );
    const news = response.data.results;
    setnews(news);
    window.scrollTo(0, 0);
  };
  const getCategory = async () => {
    const response = await axios.get(
      `/${locale}/api/information_service/news_categories/`
    );
    console.log(response);
    const category = response.data;
    setCategory(category);
  };
  const getCategoryNews = async (categoryId) => {
    setOpen(false);
    const response = await axios.get(
      `/${locale}/api/information_service/informationServiceBySlug/?submenu_slug=/info_service/news&category=${categoryId}&month=${month}&year=${year}&page=${currentPage}&page_size=${postsPerPage}`
    );
    const news = response.data.results;
    setnews(news);
    const count = response.data.count;
    setCount(count);
    const indexOfLastPost = Math.ceil(count / postsPerPage);
    setindexOfLastPost(indexOfLastPost);
  };
  useEffect(() => {
    getData();
    getnews();
    getCategory();
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
  }, []);

  return (
    <div>
      <div className="container">
        <div className="flex flex-row items-start py-[40px]">
          <div className="basis-3/4">
            <h3 className="text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]">
              {t("page-titles.info-service.news-archive")}
            </h3>
            <ul className="pr-[16px] flex items-center justify-between flex-wrap">
              {news.map((r) => (
                <li key={r.id} className="py-[16px] px-[16px] block w-[342px]">
                  <Link href={`/info_service/news/${r.id}`} className="">
                    <Image
                      unoptimized
                      className="w-[342px] h-[200px]"
                      src={r.images[0].photo}
                      alt={r.title}
                      width={342}
                      height={200}
                    />

                    <span className="inline-block my-[10px]  py-[4px] px-[16px] text-white font-inter text-[1em] bg-[#3A2F7D]">
                      {r.category}
                    </span>
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
                        <p>{dayjs(r.date).format("DD.MM.YYYY")}</p>
                      </div>
                      <div className="flex items-center">
                        <Image
                          className="mr-[5px]"
                          src={red_eye}
                          alt="red eye"
                        />
                        <p>{r.view_count}</p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
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
            </ul>
          </div>
          <div className="basis-1/4">
            <div className="w-[350px]  py-[8px] bg-[#3A2F7D] mb-[10px]">
              <p className="mb-[24px] text-[20px] px-[16px]">{title}</p>
              <ul className="">
                {submenu.map((item) => (
                  <li key={item.id} className="bg-[#3A2F7D]">
                    {item.slug === "/info_service/news" ? (
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
            <div className="w-[350px] ">
              <DatePicker
                className="w-full"
                selected={date}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                onChange={(date) => handleDate(date)}
              />
            </div>
            <div className="w-[350px] mt-[20px]">
              <label className="sr-only">
                <input
                  type="text"
                  className="hidden"
                  id="region"
                  value={selected}
                  name="region"
                  onChange={() => handleChange()}
                />
              </label>

              <div>
                <div className="">
                  <div
                    onClick={() => setOpen(!open)}
                    className="bg-[#3A2F7D] flex justify-center py-[8px] cursor-pointer rounded"
                  >
                    <p className="font-montserrat font-semibold px-[16px] text-[1.12em] text-white cursor-pointer w-[480px] h-[40px] px-[10px] pt-[8px]">
                      Sohalar
                    </p>
                    <Image src={arrow} alt="arrow" />
                  </div>
                  <ul
                    className={`${
                      open
                        ? "block w-[350px] h-auto mt-3 pt-1 bg-[#3C3976] cursor-pointer z-10"
                        : "hidden"
                    }`}
                  >
                    <li onClick={() => getnews()} className="gradientBox ">
                      <p className="hover:bg-[#24224E] bg-[#24224E] px-[20px] py-[8px] text-[#A2A0B3]">
                        Barcha Sohalar
                      </p>
                    </li>
                    {category.map((r) => (
                      <li
                        key={r.id}
                        onClick={() => getCategoryNews(r.id)}
                        className="gradientBox "
                      >
                        <p className="hover:bg-[#24224E] px-[20px] py-[8px] text-[#A2A0B3]">
                          {r.title}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
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
