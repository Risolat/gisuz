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
import OutsideClickHandler from "react-outside-click-handler";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [subm, setSubMenu] = useState(null);
  const [showInfo1, setShowInfo1] = useState(false);

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
  const changeActive = (i) => {
    setOpen(false);
    setData(
      data.map((cat, ind) => {
        if (i !== ind) {
          cat.open = false;
        }
        return cat;
      })
    );
    setData(
      data.map((cat, ind) => {
        if (i === ind) {
          cat.open = !cat.open;
        }
        return cat;
      })
    );
  };
  useEffect(() => {
    getData();
    document.addEventListener("mousedown", () => {});
  }, []);

  if (!data) return <p></p>;

  return (
    <div className="pb-[10px]">
      <div className="xl:border-[#5C587A] xl:border-b-[1px]">
        <div className="max-w-[1440px] my-0 mx-auto">
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
                className="2xl:pr-[16px] pr-[10px] w-[60px] h-[60px] xl:w-[83px] xl:h-[83px]"
              />
              <Image
                src={logo}
                alt="logo"
                width={7}
                height={83}
                className="w-[7px] h-[50px] xl:h-[83px]"
              />
              <div className="2xl:pl-[16px] pl-[10px]">
                <h1
                  className={`${roboto.variable} title-gradient text-[20px] xl:text-[24px] leading-8 font-roboto font-bold`}
                >
                  {locale === "uz"
                    ? "O‘ZKOMNAZORAT"
                    : locale === "ru"
                    ? "УЗКОМНАЗОРАТ"
                    : locale === "uzb"
                    ? "ЎЗКОМНАЗОРАТ"
                    : "INSPECTION"}
                </h1>
                <p className="hidden xl:block max-w-[280px] title-gradient text-[12px] font-normal leading-4">
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
export default NavbarBottom;
