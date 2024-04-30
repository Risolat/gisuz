import React, { useEffect, useState } from "react";
import Image from "next/image";
import menu from "../public/photos/icons/menu.svg";
import Link from "next/link";
import logoGis from "../public/photos/icons/logo-gis.svg";
import logo from "../public/photos/icons/logo.svg";
import axios from "../http";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react";
import { useClickAway } from "@uidotdev/usehooks";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Roboto } from "next/font/google";
import SocialMedia from "./SocialMedia";
import ExtraOpp from "./ExtraOpp";
import Lang from "./Lang";
import Address from "./Address";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: "500",
});
const NavbarTop = () => {
  const { t } = useTranslation("common");
  const { locale } = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [searchopen, setsearchOpen] = useState(false);
  const [search, setsearch] = useState("");
  const [resData, setresData] = useState([]);
  const [searchSubMenu, setSearchSubMenu] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState([]);
  const [subm, setSubMenu] = useState([]);
  const [isClient, setIsClient] = useState(false);

  const getMenu = async () => {
    const response = await axios.get(`/${locale}/api/menu/`);
    const data = response.data;
    const subm = data.map((sub) => {
      return sub;
    });
    setData(data);
    setSubMenu(subm);
  };
  function searchContent(q, content) {
    let textToSearch = q;
    let paragraph = content;
    textToSearch = textToSearch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    let pattern = new RegExp(`${textToSearch}`, "gi");
    let result = paragraph?.toLowerCase().indexOf(textToSearch.toLowerCase());
    result = result - 20;
    if (result) {
      paragraph = paragraph.substring(result, result + 100);
    }
    return paragraph?.replace(pattern, (match) => {
      return `<mark>${match}</mark>`;
    });
  }
  const onSubmit = async () => {
    const response = await axios.get(`/${locale}/api/search/?q=${search}`);
    setresData(response.data.results);
  };
  const searchRef = useClickAway(() => {
    searchopen(!searchopen);
  });

  const closeSearch = () => {
    setsearchOpen(false);
    const resData = [];
    setresData(resData);
  };
  const closeSearchBtn = () => {
    setsearchOpen(false);
    const resData = [];
    setresData(resData);
  };

  useEffect(() => {
    setresData(resData);
    getMenu();
    setIsClient(true);
  }, []);

  return (
    <div className="relative p-[16px] lg:p-0 xl:border-[#5C587A] xl:border-b-[1px]">
      <div className="flex items-center justify-between xl:hidden border-[#5C587A] border-b-[1px]">
        {isClient ? (
          <Link href="/" className="relative flex items-center p-3">
            <Image
              src={logoGis}
              alt="logo-gis"
              className="2xl:pr-[16px] pr-1 w-[60px] h-[60px] xl:w-[100px] xl:h-[100px]"
            />
            <Image
              src={logo}
              alt="logo"
              width={7}
              height={83}
              className="w-[7px] h-[50px] xl:h-[100px]"
            />
            <div className="2xl:pl-[16px] pl-1">
              <h1 className="title-gradient text-[16px] xl:text-[24px] leading-5 font-bold">
                {locale === "uz"
                  ? "O‘ZKOMNAZORAT"
                  : locale === "ru"
                  ? "УЗКОМНАЗОРАТ"
                  : locale === "uzb"
                  ? "ЎЗКОМНАЗОРАТ"
                  : "INSPECTION"}
              </h1>
              <p className="xl:block max-w-[284px] title-gradient text-[12px] font-normal leading-3">
                {locale === "uz"
                  ? "Raqamli texnologiyalar vazirligi huzuridagi Axborotlashtirish va telekommunikatsiyalar sohasida nazorat inspeksiyasi"
                  : locale === "ru"
                  ? "Инспекция по контролю в сфере информатизации и телекоммуникаций при Министерстве цифровых технологий"
                  : locale === "uzb"
                  ? "Рақамли технологиялар вазирлиги ҳузуридаги Ахборотлаштириш ва телекоммуникациялар соҳасида назорат инспекцияси"
                  : "Inspection for Control in the Field of Information and Telecommunications under the Ministry of Digital Technologies of the Republic of Uzbekistan"}
              </p>
            </div>
          </Link>
        ) : (
          ""
        )}

        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Image
            src={menu}
            alt="menu"
            className="w-[24px] h-[24px] mr-[10px] xl:hidden"
          />
        </button>
        {sidebarOpen === false ? (
          ""
        ) : (
          <div className="absolute top-0 left-0 z-40 w-full  my-0 mx-auto bg-[#171142]">
            <div className="p-[10px] flex items-start justify-between border-[#5C587A] bg-[#171142] border-b-[1px]">
              <Link href="/" className="relative flex items-center">
                <Image
                  src={logoGis}
                  alt="logo-gis"
                  className="pr-2"
                  width={70}
                  height={93}
                />
                <Image
                  src={logo}
                  alt="logo"
                  width={7}
                  height={93}
                  className="w-[7px] h-[50px] xl:h-[100px]"
                />
                <div className="pl-2">
                  <h1 className="title-gradient text-[16px] leading-5 font-bold">
                    {locale === "uz"
                      ? "O‘ZKOMNAZORAT"
                      : locale === "ru"
                      ? "УЗКОМНАЗОРАТ"
                      : locale === "uzb"
                      ? "ЎЗКОМНАЗОРАТ"
                      : "INSPECTION"}
                  </h1>
                  <p className="max-w-[284px] title-gradient text-[13px] font-normal leading-3">
                    {locale === "uz"
                      ? "Raqamli texnologiyalar vazirligi huzuridagi Axborotlashtirish va telekommunikatsiyalar sohasida nazorat inspeksiyasi"
                      : locale === "ru"
                      ? "Инспекция по контролю в сфере информатизации и телекоммуникаций при Министерстве цифровых технологий"
                      : locale === "uzb"
                      ? "Рақамли технологиялар вазирлиги ҳузуридаги Ахборотлаштириш ва телекоммуникациялар соҳасида назорат инспекцияси"
                      : "Inspection for Control in the Field of Information and Telecommunications under the Ministry of Digital Technologies of the Republic of Uzbekistan"}
                  </p>
                </div>
              </Link>
              <button onClick={() => setSidebarOpen(false)}>
                <Icon
                  icon="tabler:x"
                  color="gray"
                  className="w-[40px] h-[40px]"
                />
              </button>
            </div>
            <div className="flex bg-[#171142] p-[10px] border-[#5C587A] border-b-[1px]">
              <button onClick={() => setsearchOpen(!searchopen)}>
                <Icon
                  icon="akar-icons:search"
                  className="w-[24px] h-[24px] mr-[5px]"
                />
              </button>
              <ExtraOpp />
              <Lang />
            </div>
            <SocialMedia />
            <div className="overflow-scroll h-[800px]">
              <Address />
              <div className="flex justify-between flex-wrap overflow-scroll py-[30px] px-[20px] border-[#5C587A] border-b-[1px] bg-[#171142]">
                {data.map((d, i) => (
                  <ul key={d.id}>
                    <li>
                      <p className="pb-[30px] text-white text-[16px] xl:text-[1.5em] font-roboto font-bold w-[250px]">
                        {d.title}
                      </p>
                      {d.submenu.map((sub) => (
                        <ul className="w-[300px]">
                          <li>
                            <Link
                              onClick={() => setmenuOpen(false)}
                              className="block pb-[10px] text-[1.12em] font-montserrat text-[#A2A0B3] hover:text-white cursor-pointer  font-semibold"
                              locale={locale}
                              href={`${
                                sub.slug === "/activity/strategy" ||
                                sub.slug == null
                                  ? sub.link
                                  : sub.slug
                              }`}
                            >
                              {sub.title}
                            </Link>
                          </li>
                        </ul>
                      ))}
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="2xl:max-w-[1440px] hidden my-0 mx-auto xl:px-[10px] 2xl:px-[10px] xl:flex 2xl:items-start items-center justify-between pt-[8px] pb-[0]">
        <div className="navbar-left">
          <Address />
        </div>
        <div className="navbar-right flex items-start">
          <SocialMedia />
          <ExtraOpp />
          <Lang />
          <ul className="flex items-start">
            <li className="pr-[16px]">
              <Link href="/menu">
                <Image src={menu} alt="menu" className="w-[20px] h-[20px]" />
              </Link>
            </li>
            <li className="pr-[16px]">
              <button onClick={() => setsearchOpen(!searchopen)}>
                <Icon icon="akar-icons:search" className="w-[24px] h-[24px]" />
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* search modal start */}
      {searchopen ? (
        <div
          ref={searchRef}
          className="fixed top-0 bottom-0 left-0 right-0 z-30 w-full h-full bg-gray-800 bg-opacity-80"
        >
          <div className="absolute top-[40%] left-0 bottom-0 right-0  z-30 ml-[20px] ">
            <div className="">
              <div className="w-[1100px] my-0  mx-auto flex flex-col items-center justify-center bg-[#171142] border border-[#3C3971]">
                <div className="flex justify-center items-center relative w-full py-[24px] ">
                  <h3
                    className={`${roboto.variable} font-500 font-roboto text-[2rem] text-center`}
                  >
                    {locale === "uz"
                      ? "Qidirish"
                      : locale === "ru"
                      ? "Поиск"
                      : locale === "uzb"
                      ? "Қидириш"
                      : "Search"}
                  </h3>
                  <button
                    className="absolute right-[3%]"
                    onClick={() => closeSearchBtn()}
                  >
                    <Icon
                      icon="ph:x-circle-bold"
                      color="#A2A0B3"
                      className="w-[35px] h-[35px]"
                    />
                  </button>
                </div>
                <div className="flex flex-row w-full px-[20px]">
                  <input
                    type="search"
                    onChange={(event) => setsearch(event.target.value)}
                    className="w-full p-[13px] bg-[#3A2F7D] bg-[#3A2F7D]"
                  />
                  <button
                    onClick={() => onSubmit()}
                    className={`${roboto.variable} font-roboto font-500 w-[200px] tracking-normal text-[17px] leading-6 opacity-50 hover:bg-white hover:bg-[rgb(255 255 255/ .5] hover:text-[#3C3971] text-white bg-[#3C3971]`}
                  >
                    {locale === "uz"
                      ? "Qidirish"
                      : locale === "ru"
                      ? "Поиск"
                      : locale === "uzb"
                      ? "Қидириш"
                      : "Search"}
                  </button>
                </div>
                <div className="pb-[20px] overflow-scroll h-auto w-full relative">
                  {resData === 0 ? (
                    <div className="overflow-scroll h-auto w-full relative">
                      {locale === "uz"
                        ? "Topilmadi!"
                        : locale === "ru"
                        ? "Не найдено!"
                        : locale === "uzb"
                        ? "Топилмади!"
                        : "No data!"}
                    </div>
                  ) : (
                    <div
                      className={
                        resData.length != 0
                          ? "overflow-scroll max-h-[400px]"
                          : "h-auto"
                      }
                    >
                      {resData.map((r) => (
                        <div key={r.id}>
                          <div className="py-[10px] px-[20px] mb-[10px] mx-[20px] border-[#5C587A] border-[1px] rounded">
                            <Link
                              href={`/${locale}${r.sub_menu.slug}`}
                              className=""
                              onClick={() => closeSearch()}
                            >
                              <div
                                id="title"
                                dangerouslySetInnerHTML={{
                                  __html: searchContent(search, r.title),
                                }}
                              ></div>
                              <div
                                className="text-[#A2A0B3] line-clamp-1"
                                id="description"
                                dangerouslySetInnerHTML={{
                                  __html: searchContent(search, r.description),
                                }}
                              >
                                {/* {searchContent(search, r.description)} */}
                              </div>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* search modal end */}
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
export default NavbarTop;
