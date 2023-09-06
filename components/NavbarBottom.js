import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import logoGis from "../public/photos/icons/logo-gis.svg";
import logo from "../public/photos/icons/logo.svg";
import { useTranslation } from "next-i18next";
import { useEffect, useState, useRef } from "react";
import axios from "../http";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useClickAway } from "@uidotdev/usehooks";
import { Roboto } from "next/font/google";
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: "500",
});

const NavbarBottom = () => {
  const { t } = useTranslation("common");
  const { locale } = useRouter();
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [openAc, setOpenAc] = useState(false);
  const [openInf, setOpenInf] = useState(false);
  const [openInt, setOpenInt] = useState(false);
  const [openDoc, setOpenDoc] = useState(false);
  const [openCon, setOpenCon] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [subm, setSubMenu] = useState(null);
  const [showInfo1, setShowInfo1] = useState(false);
  const [info_service, setinfo_service] = useState([]);
  const [ozcom, setozcom] = useState([]);
  const [activity, setactivity] = useState([]);
  const [interactive, setinteractive] = useState([]);
  const [documents, setdocuments] = useState([]);
  const [network, setnetwork] = useState([]);

  const refOne = useRef();
  const getData = async () => {
    const response = await axios.get(`/${locale}/api/menu/`);
    const shortMenuNames = [
      "OZCOM",
      "ACTIVITY",
      "INTERACTIVE_SERVICES",
      "DOCUMENTS",
      "INFORMATION_SERVICE",
      "NETWORK",
    ];
    const data = response.data
      .filter((category) => shortMenuNames.includes(category.name))
      .map((n) => {
        return { ...n, open: false };
      });
    const subm = data.map((sub) => {
      return sub;
    });
    setData(data);
    setSubMenu(subm);
  };
  const getSubmenu = async () => {
    const response = await axios.get(`/${locale}/api/menu/`);
    const info_serviceName = ["INFORMATION_SERVICE"];
    const ozcomName = ["OZCOM"];
    const activityName = ["ACTIVITY"];
    const interactiveName = ["INTERACTIVE_SERVICES"];
    const documentsName = ["DOCUMENTS"];
    const networkName = ["NETWORK"];
    const ozcom = response.data.filter((category) =>
      ozcomName.includes(category.name)
    );
    setozcom(ozcom[0].submenu);
    const info_service = response.data.filter((category) =>
      info_serviceName.includes(category.name)
    );
    setinfo_service(info_service[0].submenu);
    const activity = response.data.filter((category) =>
      activityName.includes(category.name)
    );
    setactivity(activity[0].submenu);
    const interactive = response.data.filter((category) =>
      interactiveName.includes(category.name)
    );
    setinteractive(interactive[0].submenu);
    const documents = response.data.filter((category) =>
      documentsName.includes(category.name)
    );
    setdocuments(documents[0].submenu);
    const network = response.data.filter((category) =>
      networkName.includes(category.name)
    );
    setnetwork(network[0].submenu);
  };
  const ref = useClickAway(() => {
    setOpen(false);
  });
  const ref2 = useClickAway(() => {
    setOpenAc(false);
  });
  const ref3 = useClickAway(() => {
    setOpenInf(false);
  });
  const ref4 = useClickAway(() => {
    setOpenInt(false);
  });
  const ref5 = useClickAway(() => {
    setOpenDoc(false);
  });
  const ref6 = useClickAway(() => {
    setOpenCon(false);
  });
  function changeActive() {
    setOpenAc(false);
    setOpen(!open);
    setOpenInt(false);
    setOpenInf(false);
    setOpenCon(false);
    setOpenDoc(false);
  }
  function activityCat() {
    setOpenAc(!openAc);
    setOpen(false);
    setOpenInt(false);
    setOpenInf(false);
    setOpenCon(false);
    setOpenDoc(false);
  }
  function intCat() {
    setOpenAc(false);
    setOpen(false);
    setOpenInt(!openInt);
    setOpenInf(false);
    setOpenCon(false);
    setOpenDoc(false);
  }
  function infCat() {
    setOpenAc(false);
    setOpen(false);
    setOpenInt(false);
    setOpenInf(!openInf);
    setOpenCon(false);
    setOpenDoc(false);
  }
  function connectCat() {
    setOpenAc(false);
    setOpen(false);
    setOpenInt(false);
    setOpenInf(false);
    setOpenCon(!openCon);
    setOpenDoc(false);
  }
  function documentCat() {
    setOpenAc(false);
    setOpen(false);
    setOpenInt(false);
    setOpenInf(false);
    setOpenCon(false);
    setOpenDoc(!openDoc);
  }
  useEffect(() => {
    getData();
    getSubmenu();
  }, []);

  if (!data) return <p></p>;

  return (
    <div className="pb-[10px]">
      <div className="xl:border-[#5C587A] xl:border-b-[1px]">
        <div className="max-w-[1440px] my-0 mx-auto xl:px-[10px] py-2 2xl:py-0 2xl:px-[10px]">
          <div className="flex justify-between items-center ">
            <Link
              href="/"
              className="hidden xl:flex relative flex items-center"
            >
              <Image
                src={logoGis}
                alt="logo-gis"
                width={83}
                height={83}
                className="2xl:pr-[16px] pr-[10px] w-[60px] h-[60px] xl:w-[70px] xl:h-[70px] 2xl:w-[83px] 2xl:h-[83px]"
              />
              <Image
                src={logo}
                alt="logo"
                width={7}
                height={83}
                className="w-[7px] h-[50px] xl:h-[70px] 2xl:h-[83px]"
              />
              <div className="2xl:pl-[16px] pl-[10px]">
                <h1
                  className={`${roboto.variable} subpixel-antialiased title-gradient xl:text-[17px] 2xl:text-[20px] xl:text-[24px] 2xl:leading-8 leading-6 font-roboto font-bold`}
                >
                  {locale === "uz"
                    ? "O‘ZKOMNAZORAT"
                    : locale === "ru"
                    ? "УЗКОМНАЗОРАТ"
                    : locale === "uzb"
                    ? "ЎЗКОМНАЗОРАТ"
                    : "INSPECTION"}
                </h1>
                <p className="hidden subpixel-antialiased xl:block max-w-[220px] 2xl:max-w-[280px] title-gradient xl:text-[11px] 2xl:text-[12px] font-normal 2xl:leading-4 leading-3">
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

            <div id="navbarList" className="navbarList">
              <ul className="nav-list flex hidden xl:flex xl:text-[14px] 2xl:text-[16px]">
                <li
                  className="nav-item relative"
                  onClick={() => changeActive()}
                >
                  <button className="flex items-center px-[5px]">
                    <p className="pr-[8px]">
                      {locale === "uz"
                        ? "Oʻzkomnazorat"
                        : locale === "ru"
                        ? "Узкомназорат"
                        : locale === "uzb"
                        ? "Ўзкомназорат"
                        : "Inspection"}
                    </p>
                    {open ? (
                      <Icon
                        icon="ep:arrow-up-bold"
                        color="white"
                        width={12}
                        height={12}
                      />
                    ) : (
                      <Icon
                        icon="ep:arrow-down-bold"
                        color="white"
                        width={12}
                        height={12}
                      />
                    )}
                  </button>
                  {open ? (
                    <div
                      ref={ref}
                      className="absolute top-[60px] left-0 w-[300px] flex flex-col text-[16px] text-[#A2A0B3] bg-[#3A2F7D] z-10"
                    >
                      <div>
                        {ozcom.map((sub) => (
                          <div className="gradientBox" key={sub.id}>
                            <div className="bg-[#3A2F7D] hover:bg-[#171142] hover:text-[#fff]">
                              <Link
                                className="block py-[10px] px-[20px] cursor-pointer"
                                onClick={() => setOpen(open === false)}
                                href={`${
                                  sub.slug === "/activity/strategy" ||
                                  sub.slug == null
                                    ? sub.link
                                    : sub.slug
                                }`}
                                target={`${
                                  sub.slug === "/activity/strategy" ||
                                  sub.slug == null
                                    ? "_blank"
                                    : "_self"
                                }`}
                              >
                                {sub.title}
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </li>
                <li className="nav-item relative" onClick={() => activityCat()}>
                  <button className="flex items-center px-[5px]">
                    <p className="pr-[8px]">
                      {locale === "uz"
                        ? "Faoliyat"
                        : locale === "ru"
                        ? "Деятельность"
                        : locale === "uzb"
                        ? "Фаолият"
                        : "Activity"}
                    </p>
                    {openAc ? (
                      <Icon
                        icon="ep:arrow-up-bold"
                        color="white"
                        width={12}
                        height={12}
                      />
                    ) : (
                      <Icon
                        icon="ep:arrow-down-bold"
                        color="white"
                        width={12}
                        height={12}
                      />
                    )}
                  </button>
                  {openAc ? (
                    <div
                      ref={ref2}
                      className="absolute top-[60px] left-0 w-[300px] flex flex-col text-[16px] text-[#A2A0B3] bg-[#3A2F7D] z-10"
                    >
                      <div>
                        {activity.map((sub) => (
                          <div className="gradientBox" key={sub.id}>
                            <div className="bg-[#3A2F7D] hover:bg-[#171142] hover:text-[#fff]">
                              <Link
                                className="block py-[10px] px-[20px] cursor-pointer"
                                onClick={() => setOpenAc(openAc === false)}
                                href={`${
                                  sub.slug === "/activity/strategy" ||
                                  sub.slug == null
                                    ? sub.link
                                    : sub.slug
                                }`}
                                target={`${
                                  sub.slug === "/activity/strategy" ||
                                  sub.slug == null
                                    ? "_blank"
                                    : "_self"
                                }`}
                              >
                                {sub.title}
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </li>
                <li className="nav-item relative" onClick={() => infCat()}>
                  <button className="flex items-center px-[5px]">
                    <p className="pr-[8px]">
                      {locale === "uz"
                        ? "Axborot xizmati"
                        : locale === "ru"
                        ? "Пресса"
                        : locale === "uzb"
                        ? "Ахборот хизмати"
                        : "Press office"}
                    </p>
                    {openInf ? (
                      <Icon
                        icon="ep:arrow-up-bold"
                        color="white"
                        width={12}
                        height={12}
                      />
                    ) : (
                      <Icon
                        icon="ep:arrow-down-bold"
                        color="white"
                        width={12}
                        height={12}
                      />
                    )}
                  </button>
                  {openInf ? (
                    <div
                      ref={ref3}
                      className="absolute top-[60px] left-0 w-[300px] flex flex-col text-[16px] text-[#A2A0B3] bg-[#3A2F7D] z-10"
                    >
                      <div>
                        {info_service.map((sub) => (
                          <div className="gradientBox" key={sub.id}>
                            <div className="bg-[#3A2F7D] hover:bg-[#171142] hover:text-[#fff]">
                              <Link
                                className="block py-[10px] px-[20px] cursor-pointer"
                                onClick={() => setOpenInf(openInf === false)}
                                href={`${
                                  sub.slug === "/activity/strategy" ||
                                  sub.slug == null
                                    ? sub.link
                                    : sub.slug
                                }`}
                                target={`${
                                  sub.slug === "/activity/strategy" ||
                                  sub.slug == null
                                    ? "_blank"
                                    : "_self"
                                }`}
                              >
                                {sub.title}
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </li>
                <li className="nav-item relative" onClick={() => intCat()}>
                  <button className="flex items-center px-[5px]">
                    <p className="pr-[8px]">
                      {locale === "uz"
                        ? "Interaktiv xizmatlar"
                        : locale === "ru"
                        ? "Интерактивные услуги"
                        : locale === "uzb"
                        ? "Интерактив хизматлар"
                        : "Interactive Services"}
                    </p>
                    {openInt ? (
                      <Icon
                        icon="ep:arrow-up-bold"
                        color="white"
                        width={12}
                        height={12}
                      />
                    ) : (
                      <Icon
                        icon="ep:arrow-down-bold"
                        color="white"
                        width={12}
                        height={12}
                      />
                    )}
                  </button>
                  {openInt ? (
                    <div
                      ref={ref4}
                      className="absolute top-[60px] left-0 w-[300px] flex flex-col text-[16px] text-[#A2A0B3] bg-[#3A2F7D] z-10"
                    >
                      <div>
                        {interactive.map((sub) => (
                          <div className="gradientBox" key={sub.id}>
                            <div className="bg-[#3A2F7D] hover:bg-[#171142] hover:text-[#fff]">
                              <Link
                                className="block py-[10px] px-[20px] cursor-pointer"
                                onClick={() => setOpenInt(openInt === false)}
                                href={`${
                                  sub.slug === "/activity/strategy" ||
                                  sub.slug == null
                                    ? sub.link
                                    : sub.slug
                                }`}
                                target={`${
                                  sub.slug === "/activity/strategy" ||
                                  sub.slug == null
                                    ? "_blank"
                                    : "_self"
                                }`}
                              >
                                {sub.title}
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </li>
                <li className="nav-item relative" onClick={() => documentCat()}>
                  <button className="flex items-center px-[5px]">
                    <p className="pr-[8px]">
                      {locale === "uz"
                        ? "Me’yoriy-huquqiy hujjatlar"
                        : locale === "ru"
                        ? "Нормативные документы"
                        : locale === "uzb"
                        ? "Меъёрий-ҳуқуқий ҳужжатлар"
                        : "Regulatory documents"}
                    </p>
                    {openDoc ? (
                      <Icon
                        icon="ep:arrow-up-bold"
                        color="white"
                        width={12}
                        height={12}
                      />
                    ) : (
                      <Icon
                        icon="ep:arrow-down-bold"
                        color="white"
                        width={12}
                        height={12}
                      />
                    )}
                  </button>
                  {openDoc ? (
                    <div
                      ref={ref5}
                      className="absolute top-[60px] left-0 w-[300px] flex flex-col text-[16px] text-[#A2A0B3] bg-[#3A2F7D] z-10"
                    >
                      <div>
                        {documents.map((sub) => (
                          <div className="gradientBox" key={sub.id}>
                            <div className="bg-[#3A2F7D] hover:bg-[#171142] hover:text-[#fff]">
                              <Link
                                className="block py-[10px] px-[20px] cursor-pointer"
                                onClick={() => setOpenDoc(openDoc === false)}
                                href={`${
                                  sub.slug === "/activity/strategy" ||
                                  sub.slug == null
                                    ? sub.link
                                    : sub.slug
                                }`}
                                target={`${
                                  sub.slug === "/activity/strategy" ||
                                  sub.slug == null
                                    ? "_blank"
                                    : "_self"
                                }`}
                              >
                                {sub.title}
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </li>
                <li className="nav-item relative" onClick={() => connectCat()}>
                  <button className="flex items-center px-[5px]">
                    <p className="pr-[8px]">
                      {locale === "uz"
                        ? "Aloqa"
                        : locale === "ru"
                        ? "Контакты"
                        : locale === "uzb"
                        ? "Алоқа"
                        : "Contacts"}
                    </p>
                    {openCon ? (
                      <Icon
                        icon="ep:arrow-up-bold"
                        color="white"
                        width={12}
                        height={12}
                      />
                    ) : (
                      <Icon
                        icon="ep:arrow-down-bold"
                        color="white"
                        width={12}
                        height={12}
                      />
                    )}
                  </button>
                  {openCon ? (
                    <div
                      ref={ref6}
                      className="absolute top-[60px] left-0 w-[300px] flex flex-col text-[16px] text-[#A2A0B3] bg-[#3A2F7D] z-10"
                    >
                      <div>
                        {network.map((sub) => (
                          <div className="gradientBox" key={sub.id}>
                            <div className="bg-[#3A2F7D] hover:bg-[#171142] hover:text-[#fff]">
                              <Link
                                className="block py-[10px] px-[20px] cursor-pointer"
                                onClick={() => setOpenCon(openCon === false)}
                                href={`${
                                  sub.slug === "/activity/strategy" ||
                                  sub.slug == null
                                    ? sub.link
                                    : sub.slug
                                }`}
                                target={`${
                                  sub.slug === "/activity/strategy" ||
                                  sub.slug == null
                                    ? "_blank"
                                    : "_self"
                                }`}
                              >
                                {sub.title}
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </li>
              </ul>
            </div>

            {/* <div id="navbarList" className="navbarList">
              <ul className="nav-list flex hidden xl:flex">
                {data.map((category, i) => (
                  <li
                    key={category.id}
                    className="nav-item relative"
                    onClick={() => changeActive(i)}
                  >
                    <OutsideClickHandler
                      onOutsideClick={() => {
                        setOpen(false);
                      }}
                    >
                      <button className="flex items-center px-[5px]">
                        <p className="pr-[8px]">{category.title}</p>
                        {category.open ? (
                          <Icon
                            icon="ep:arrow-up-bold"
                            color="white"
                            width={12}
                            height={12}
                          />
                        ) : (
                          <Icon
                            icon="ep:arrow-down-bold"
                            color="white"
                            width={12}
                            height={12}
                          />
                        )}
                      </button>
                    </OutsideClickHandler>
                    {category.open ? (
                      <div className="absolute top-[60px] left-0 w-[300px] flex flex-col py-[20px] text-[16px] text-[#A2A0B3] bg-[#3A2F7D] z-10">
                        <div>
                          {category.submenu.map((sub) => (
                            <div className="gradientBox" key={sub.id}>
                              <div className="bg-[#3A2F7D] hover:bg-[#171142] hover:text-[#fff]">
                                <Link
                                  className="block py-[10px] px-[20px] cursor-pointer"
                                  onClick={() =>
                                    setOpen(category.open === false)
                                  }
                                  href={`${
                                    sub.slug === "/activity/strategy" ||
                                    sub.slug == null
                                      ? sub.link
                                      : sub.slug
                                  }`}
                                  target={`${
                                    sub.slug === "/activity/strategy" ||
                                    sub.slug == null
                                      ? "_blank"
                                      : "_self"
                                  }`}
                                >
                                  {sub.title}
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </li>
                ))}
              </ul>
            </div> */}
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
export default NavbarBottom;
