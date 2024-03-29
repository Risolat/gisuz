import axios from "../../http";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Pagination from "../../components/Pagination";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../next-i18next.config";
import { Roboto, Montserrat } from "next/font/google";
import Head from "next/head";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: "500",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const page = () => {
  const [title, setTitle] = useState();
  const [submenu, setSubmenu] = useState([]);
  const [inspectors, setinspectors] = useState([]);
  const [modal, setModal] = useState(false);
  const [count, setCount] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(4);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const { t } = useTranslation("common");
  const { locale } = useRouter();

  const getData = async () => {
    const response = await axios.get(`/${locale}/api/menu/`);

    const menuName = ["OZCOM"];

    const data = response.data.filter((category) =>
      menuName.includes(category.name)
    );

    const title = data.map((d) => {
      return d.title;
    });
    setTitle(title);
    setSubmenu(data[0].submenu);
  };

  const getinspectorsPerPage = async () => {
    const response = await axios.get(
      `/${locale}/api/employee/employeeBySlug/?submenu_slug=/ozkomnazorat/inspectors&page=${currentPage}&page_size=${postsPerPage}`
    );
    const count = response.data.count;
    setCount(count);
    console.log(response);
    const inspectors = response.data.results.map((d) => {
      return { ...d, modal: false };
    });
    setinspectors(inspectors);
  };
  const changeActive = (i) => {
    setinspectors(
      inspectors.map((dep, ind) => {
        if (i !== ind) {
          dep.modal = false;
        }
        return dep;
      })
    );
    setinspectors(
      inspectors.map((dep, ind) => {
        if (i === ind) {
          dep.modal = !dep.modal;
        }
        return dep;
      })
    );
  };
  function hideModal(i) {
    const hide = document.getElementById("modalId");
    hide.classList.add("hidden");
    setinspectors(
      inspectors.map((dep, ind) => {
        if (i !== ind) {
          dep.modal = false;
        }
        return dep;
      })
    );
    setinspectors(
      inspectors.map((dep, ind) => {
        if (i === ind) {
          dep.modal = !dep.modal;
        }
        return dep;
      })
    );
    return hide;
  }
  const previousPage = async () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
    const response = await axios.get(
      `/${locale}/api/employee/employeeBySlug/?submenu_slug=/ozkomnazorat/inspectors&page=${currentPage}&page_size=${postsPerPage}`
    );
    const inspectors = response.data.results;
    setinspectors(inspectors);
    window.scrollTo(0, 0);
  };

  const nextPage = async () => {
    if (currentPage !== Math.ceil(count / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
    const response = await axios.get(
      `/${locale}/api/employee/employeeBySlug/?submenu_slug=/ozkomnazorat/inspectors&page=${currentPage}&page_size=${postsPerPage}`
    );
    const inspectors = response.data.results;
    setinspectors(inspectors);
    window.scrollTo(0, 0);
  };
  const paginate = async (currentPage) => {
    const response = await axios.get(
      `/${locale}/api/employee/employeeBySlug/?submenu_slug=/ozkomnazorat/inspectors&page=${currentPage}&page_size=${postsPerPage}`
    );
    setCurrentPage(currentPage);
    const inspectors = response.data.results;
    setinspectors(inspectors);
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    getData();
    getinspectorsPerPage();
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
  }, []);

  return (
    <div>
      <Head>
        <title>{t("page-titles.ozcom.inspections")}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={t("page-titles.ozcom.inspections")} />
        <meta
          property="og:title"
          content={t("page-titles.ozcom.inspections")}
          key="title"
        />
        <meta name="title" content={t("page-titles.ozcom.inspections")} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://gis.uz/ozkomnazorat/inspectors"
        />
        <meta property="og:title" content="Oʻzkomnazorat" />
        <meta
          property="og:description"
          content={t("page-titles.ozcom.inspections")}
        />
        <meta
          property="twitter:url"
          content="https://gis.uz/ozkomnazorat/inspectors"
        />
        <meta property="twitter:title" content="`Oʻzkomnazorat" />
        <meta
          property="twitter:description"
          content={t("page-titles.ozcom.inspections")}
        />
        <meta
          property="og:title"
          content={t("page-titles.ozcom.inspections")}
          key="title"
        />
      </Head>
      <div className="container">
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px]">
          <div className="2xl:basis-3/4 basis-full w-full pl-[20px] mb-[20px] mr-[30px]">
            <h3
              className={`${montserrat.variable} text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]`}
            >
              {t("page-titles.ozcom.inspections")}
            </h3>
            {inspectors.map((l, i) => (
              <div className="gradientBox mb-[30px]" key={l.id}>
                <div className="flex flex-col lg:flex-row p-[24px] bg-[#3A2F7D]  hover:bg-[#312E6B]">
                  <div className="basis-1/5">
                    <div className="mr-[24px] w-[full] h-[full]">
                      <img
                        className="w-[236px] h-[250px] object-cover object-top"
                        src={l.photo}
                        alt="photo"
                        width={236}
                        height={250}
                      />
                    </div>
                  </div>
                  <div className="basis-4/5 flex flex-col">
                    <div className="basis-6/12">
                      <p className="text-[#3D8DFF] xl:text-left xl:text-left font-montserrat font-medium text-[1.12em] mb-[8px]">
                        {l.position}
                      </p>
                      <p className="font-semibold xl:text-left text-[#A2A0B3] xl:text-left font-inter text-[1.25em] h-[90px] max-h-[90px]">
                        {l.last_name} {l.first_name} {l.father_name}
                      </p>
                    </div>
                    <div className="border-[#5C587A] border-b-[2px]">
                      <h3
                        onClick={() => changeActive(i)}
                        className="text-white xl:text-left font-montserrat font-medium text-[16px] lg:text-[1.12em] pb-[8px] hover:border-b-[1px] cursor-pointer"
                      >
                        {l.address}
                      </h3>
                    </div>
                    <div
                      className={`${roboto.variable} flex flex-col xl:flex-row basis-6/12 font-roboto`}
                    >
                      <div className="flex items-center mr-[30px]">
                        <Icon
                          className="text-white mr-[5px]"
                          height="34px"
                          icon="carbon:phone-filled"
                          width="34px"
                        />
                        <div>
                          <p className="font-medium text-[0.8125em] text-[#A2A0B3] mb-[4px]">
                            {t("form.phone")}
                          </p>
                          <p className="text-[1em] text-white">{l.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center mr-[30px]">
                        <Icon
                          className="text-white mr-[5px]"
                          height="34px"
                          icon="cib:mail-ru"
                          width="34px"
                        />
                        <div>
                          <p className="font-medium text-[0.8125em] text-[#A2A0B3] mb-[4px]">
                            {t("form.email")}
                          </p>
                          <p className="text-[1em] text-white">{l.mail}</p>
                        </div>
                      </div>
                      <div className="flex items-center mr-[30px]">
                        <Icon
                          className="text-white mr-[5px]"
                          height="34px"
                          icon="fa-solid:calendar-alt"
                          width="34px"
                        />
                        <div>
                          <p className="font-medium text-[0.8125em] text-[#A2A0B3] mb-[4px]">
                            {t("card.receive-time")}
                          </p>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: l.working_time,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="modalId"
                    onClick={() => hideModal(i)}
                    className={`${
                      l.modal
                        ? "fixed top-0 bottom-0 left-0 right-0 z-30 w-full h-full bg-[rgba(0,0,0,.4)]"
                        : "hidden"
                    }`}
                  >
                    <div className="modal fixed top-[5%] left-[-20px] bottom-0 right-0 w-screen h-screen  z-30 ml-[20px]">
                      <div className="w-screen h-screen ">
                        <div className="relative w-[1300px] pt-[30px] my-0  mx-auto flex items-start justify-center bg-[#3A2F7D]">
                          <div className="flex flex-col items-center px-[30px]">
                            <img
                              className="w-[200px] h-[222px] md:w-[250px] md:h-[300px] mb-[30px] object-cover object-top"
                              src={l.photo}
                              alt="photo"
                              width={250}
                              height={300}
                            />
                            <h2 className="font-semibold pb-[20px] font-inter text-[.9em] text-[#A2A0B3] md:text-[1.25em] text-center ">
                              {l.last_name} {l.first_name} {l.father_name}
                            </h2>
                            <h3
                              className={`${montserrat.variable} text-[#3D8DFF] pb-[20px] tracking-wide font-montserrat font-semibold text-[1.12em] text-[1.12em] md:mb-[8px] text-center`}
                            >
                              {l.position}
                            </h3>
                            <div
                              className="pb-[30px] desc-html leading-[38px] w-full text-[.8rem] text-[#A2A0B3] leading-[22px] text-justify font-inter break-words overflow-scroll h-[400px]"
                              dangerouslySetInnerHTML={{
                                __html: l.description,
                              }}
                            />
                          </div>
                          <button
                            className="absolute right-[3%] "
                            onClick={() => hideModal(i)}
                          >
                            <Icon
                              icon="iconoir:cancel"
                              width="30"
                              height="30"
                              color="white"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
          </div>
          <div className="sticky top-[197px] mt-[85px] 2xl:w-[350px] w-full 2xl:basis-1/4 basis-full mx-[20px] 2xl:mx-0  py-[8px] bg-[#3A2F7D]">
            <p
              className={`${montserrat.variable} font-semibold font-montserrat mb-[24px] text-[1.12rem] px-[16px]`}
            >
              {title}
            </p>
            <ul className="">
              {submenu.map((item) => (
                <li key={item.id} className="bg-[#3A2F7D]">
                  {item.slug === "/ozkomnazorat/inspectors" ? (
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
