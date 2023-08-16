import React, { useEffect, useState } from "react";
import Image from "next/image";
import location from "../public/photos/icons/location.svg";
import mail from "../public/photos/mail.svg";
import facebook from "../public/photos/icons/facebook.svg";
import instagram from "../public/photos/icons/instagram.svg";
import telegram from "../public/photos/icons/telegram.svg";
import youtube from "../public/photos/icons/youtube.svg";
import eye from "../public/photos/icons/eye.svg";
import volume from "../public/photos/icons/volume.svg";
import arrow from "../public/photos/icons/arrow.svg";
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

const NavbarTop = () => {
  const { t } = useTranslation("common");
  const { locale } = useRouter();
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [selected, setSelected] = useState();
  const [open, setOpen] = useState(false);
  const [searchopen, setsearchOpen] = useState(false);
  const [search, setsearch] = useState("");
  const [resData, setresData] = useState([]);
  const [searchSubMenu, setSearchSubMenu] = useState([]);
  const [view, setView] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState([]);
  const [subm, setSubMenu] = useState([]);
  const [size, setSize] = useState(16);
  const [isClient, setIsClient] = useState(false);

  const languages = [
    { name: "O'zb", key: "uz" },
    { name: "Ру", key: "ru" },
    { name: "En", key: "en" },
    { name: "Ўзб", key: "uzb" },
  ];

  const getMenu = async () => {
    const response = await axios.get(`/${locale}/api/menu/`);
    const data = response.data;
    const subm = data.map((sub) => {
      return sub;
    });
    console.log(data);
    setData(data);
    setSubMenu(subm);
  };
  const onSubmit = async () => {
    const response = await axios.get(`/${locale}/api/search/?q=${search}`);
    const resData = response.data.results;
    console.log(resData);
    const searchSubMenu = resData.map((r) => {
      return r.sub_menu.slug;
    });
    // let paragraph = resData.map((r) => {
    //   return r.title;
    // });
    // const description = document.getElementById("description");
    // if (search !== "") {
    //   let regexPattern = new RegExp(search, "gi");
    //   description === description.replace(regexPattern, "<mark>$&</mark>") ||
    //     "";
    // }

    setSearchSubMenu(searchSubMenu);
    setresData(resData);
    console.log(errors);
  };
  const ref = useClickAway(() => {
    setIsOpen(false);
  });
  const searchRef = useClickAway(() => {
    searchopen(!searchopen);
  });
  const handleOpenModal = () => {
    if (isOpen === false) {
      setIsOpen(true);
    }
  };
  function handleChange(event) {
    setsearch(event.target.value);
  }
  const changeFontSize = (event) => {
    const range = event.target.valueAsNumber;
    const html = document.getElementsByTagName("body")[0];
    const size = (html.style.fontSize = range + "px");
    // const size = font;
    setSize(size);
    console.log(size);
    console.log(html);
    return size;
  };
  const Highlighted = (search = "", highlight = "") => {
    if (!highlight.trim()) {
      return <span>{search}</span>;
    }
    const regex = new RegExp(`(${_.escapeRegExp(highlight)})`, "gi");
    const parts = search.split(regex);
    return (
      <span>
        {parts
          .filter((part) => part)
          .map((part, i) =>
            regex.test(part) ? (
              <mark key={i}>{part}</mark>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
      </span>
    );
  };
  const changeColor = () => {
    let html = document.querySelector("html");
    if (view === "grayscale1") {
      html.style.filter = "grayscale(1)";
      console.log("grey1");
    } else if (view === "grayscale") {
      html.style.filter = "grayscale(100%) invert(100%)";
      console.log("grey");
    } else {
      html.style.filter = "";
      console.log("normal");
    }
    return view;
    setIsOpen(!isOpen);
  };
  const closeSearch = () => {
    setsearchOpen(false);
    const resData = [];
    setresData(resData);
  };
  function getSelectionText() {
    let text = "";
    if (window.getSelection) {
      text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
      text = document.selection.createRange().text;
    }
    return text;
  }
  function speechBtnClicked() {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    } else {
      let text = getSelectionText();
      if (text) {
        getVoice(text);
      }
    }
  }

  function getVoice(text) {
    console.log(speechSynthesis.getVoices());
    console.log(navigator);
    // console.log(speechSynthesis.getVoices());

    const voices = speechSynthesis
      .getVoices()
      .map((voice) => {
        if (navigator.userAgent.includes("Chrome")) {
          return (
            (voice.name.includes("Google") || voice.lang.includes("tr")) &&
            voice
          );
        } else {
          return voice;
        }
      })
      .filter((voice) => voice);
    console.log(voices);
    let textToSpeak = text;
    let speakData = new SpeechSynthesisUtterance();
    speakData.text = textToSpeak;
    speakData.rate = 0.7;
    speakData.voice = voices.find((voice) => {
      if (locale === "uz") {
        return voice.lang.includes("tr");
      } else if (locale === "uzb") {
        return voice.lang.includes("ru");
      } else if (locale === "ru") {
        return voice.lang.includes("ru");
      } else {
        voice.lang.includes("en-GB");
      }
    });
    console.log(voices, "voices");
    speechSynthesis.speak(speakData);
    setTimeout(() => {
      if (!speechSynthesis.speaking) {
        speechSynthesis.speak(speakData);
      }
    }, 2000);
  }
  useEffect(() => {
    setSelected(languages.find((n) => n.key === locale).name);
    setresData(resData);
    getMenu();
    setIsClient(true);
  }, []);

  return (
    <div className="relative p-[16px] lg:p-0 xl:border-[#5C587A] xl:border-b-[1px]">
      <div className="flex items-center justify-between xl:hidden border-[#5C587A] border-b-[1px]">
        {isClient ? (
          <Link href="/" className="relative flex items-center">
            <Image
              src={logoGis}
              alt="logo-gis"
              className="2xl:pr-[16px] pr-[10px] w-[60px] h-[60px] xl:w-[100px] xl:h-[100px]"
            />
            <Image
              src={logo}
              alt="logo"
              className="w-[10px] h-[50px] xl:h-[100px]"
            />
            <div className="2xl:pl-[16px] pl-[10px]">
              <h1 className="title-gradient text-[20px] xl:text-[24px] leading-8 font-bold">
                {t("navbar.ozcom")}
              </h1>
              <p className="hidden xl:block max-w-[284px] title-gradient text-[14px] font-normal leading-4">
                {t("navbar.ozcom-full")}
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
          <div className="absolute top-0 left-0 z-40 w-full h-auto my-o mx-auto bg-[#171142]">
            <div className="p-[10px] flex items-start justify-between border-[#5C587A] bg-[#171142] border-b-[1px]">
              <Link href="/" className="relative flex items-center">
                <Image
                  src={logoGis}
                  alt="logo-gis"
                  className=":pr-[16px] pr-[10px]"
                />
                <Image src={logo} alt="logo" className="" />
                <div className="pl-[16px]">
                  <h1 className="title-gradient text-[20px] text-[24px] leading-8 font-bold">
                    {t("navbar.ozcom")}
                  </h1>
                  <p className="max-w-[284px] title-gradient text-[14px] font-normal leading-4">
                    {t("navbar.ozcom-full")}
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
                {/* <Image src={searchBtn} alt="search" /> */}
              </button>
              <ul className="extra-list flex items-start">
                <li className="extra-item pr-[15px]">
                  <a
                    href="#"
                    className="relative"
                    onClick={() => handleOpenModal()}
                  >
                    <Image src={eye} alt="eye" />
                  </a>
                  {isOpen ? (
                    <div ref={ref}>
                      <div className="eye-modal w-[220px] z-20 absolute p-[20px] bg-[#3A2F7D]">
                        <p className="text-[#8F8F8F] text-[18px]">
                          {t("navbar.site-view")}
                        </p>
                        <ul className="flex items-center justify-between py-[15px] border-[#5C587A] border-b-[2px]">
                          <li>
                            <button
                              className="py-[10px] px-[17px] text-[18px] bg-[#171142]"
                              onClick={() => changeColor(setView("normal"))}
                            >
                              A
                            </button>
                          </li>
                          <li>
                            <button
                              className="py-[10px] px-[17px] text-[18px] bg-[#000]"
                              onClick={() => changeColor(setView("grayscale"))}
                            >
                              A
                            </button>
                          </li>
                          <li>
                            <button
                              className="py-[10px] px-[17px] text-[18px] text-[#000] bg-gray-300"
                              onClick={() => changeColor(setView("grayscale1"))}
                            >
                              A
                            </button>
                          </li>
                        </ul>
                        <p className="my-[10px] text-[18px] text-[#8F8F8F]">
                          {t("navbar.shrift-size")}
                        </p>
                        <input
                          id="range"
                          className="w-full"
                          type="range"
                          min="14"
                          max="20"
                          step="2"
                          onChange={(event) => console.log(event)}
                          onClick={() => changeFontSize()}
                        />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </li>
                <li className="extra-item pr-[15px]">
                  <a href="#" onClick={() => speechBtnClicked()}>
                    <Image src={volume} alt="volume" />
                  </a>
                </li>
                {/* <li className="text-[#A2A0B3] pr-[16px]">|</li> */}
              </ul>
              <div className="w-20">
                <div
                  onClick={() => setOpen(!open)}
                  className="w-full  flex justify-center cursor-pointer rounded"
                >
                  <p className="text-[16px]">{selected}</p>
                  <Image src={arrow} alt="arrow" />
                </div>
                <ul
                  className={`${
                    open
                      ? "block absolute w-48 h-38 mt-3  pt-1 bg-[#3C3976] cursor-pointer z-10"
                      : "hidden"
                  }`}
                >
                  <li>
                    <a
                      href={`/uz${router.pathname}`}
                      locale="uz"
                      onClick={() => {
                        setSelected("O`zb");
                        setOpen(false);
                      }}
                      className={
                        locale === "uz"
                          ? "px-[10px] py-[8px] block text-sm pointer bg-[#171142] hover:text-white"
                          : "px-[10px] py-[8px] block text-sm pointer bg-[#3C3976] hover:bg-[#171142] hover:text-white"
                      }
                    >
                      O`zbek tili
                    </a>
                  </li>
                  <li>
                    <a
                      href={`/uzb${router.pathname}`}
                      locale="uzb"
                      onClick={() => {
                        setSelected("Ўзб");
                        setOpen(false);
                      }}
                      className={
                        locale === "uzb"
                          ? "px-[10px] py-[8px] block text-sm pointer bg-[#171142] hover:text-white"
                          : "px-[10px] py-[8px] block text-sm pointer bg-[#3C3976] hover:bg-[#171142] hover:text-white"
                      }
                    >
                      Ўзбек тили
                    </a>
                  </li>
                  <li>
                    <a
                      href={`/ru${router.pathname}`}
                      locale="ru"
                      onClick={() => {
                        setSelected("Ру");
                        setOpen(false);
                      }}
                      className={
                        locale === "ru"
                          ? "px-[10px] py-[8px] block text-sm pointer bg-[#171142] hover:text-white"
                          : "px-[10px] py-[8px] block text-sm pointer bg-[#3C3976] hover:bg-[#171142] hover:text-white"
                      }
                    >
                      Русский язык
                    </a>
                  </li>
                  <li>
                    <a
                      href={`/en${router.pathname}`}
                      locale="en"
                      onClick={() => {
                        setSelected("En");
                        setOpen(false);
                      }}
                      className={
                        locale === "en"
                          ? "px-[10px] py-[8px] block text-sm pointer bg-[#171142] hover:text-white"
                          : "px-[10px] py-[8px] block text-sm pointer bg-[#3C3976] hover:bg-[#171142] hover:text-white"
                      }
                    >
                      English
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex justify-between flex-wrap py-[30px] px-[20px] border-[#5C587A] border-b-[1px] bg-[#171142]">
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
            <ul className="adress-list flex flex-wrap mb-[10px] pt-[20px] ">
              <li className="adress-item pr-[16px] mb-[10px]">
                <a
                  href="#"
                  className="adress-link flex items-center justify-center"
                >
                  <Image src={location} alt="location" />
                  <p className="2xl:w-full pl-[5px] text-[#A2A0B3] xl:w-[300px] xl:pl-0">
                    {t("navbar.address")}
                  </p>
                </a>
              </li>
              <li className="adress-item mb-[10px]">
                <a
                  href="#"
                  className="adress-link flex items-center justify-center"
                >
                  <Image src={mail} alt="mail" />
                  <p className="pl-[5px] text-[#A2A0B3]">info@gis.uz</p>
                </a>
              </li>
            </ul>
            <ul className="social-media flex items-center pb-[20px] border-[#5C587A] border-b-[1px]">
              <li className="social-media-item pr-[15px]">
                <Link
                  href="https://www.facebook.com/uzkomnazorat/"
                  target="_blank"
                  title="facebook"
                >
                  <Image src={facebook} alt="facebook" />
                </Link>
              </li>
              <li className="social-media-item pr-[15px]">
                <Link
                  href="https://www.instagram.com/uzkomnazorat/"
                  target="_blank"
                >
                  <Image src={instagram} alt="instagram" />
                </Link>
              </li>
              <li className="social-media-item pr-[15px]">
                <Link href="https://t.me/gisuz" target="_blank">
                  <Image src={telegram} alt="telegram" />
                </Link>
              </li>
              <li className="social-media-item pr-[15px]">
                <Link
                  href="https://www.youtube.com/channel/UC3ajfdl_uoWLGR1B-eCELWA"
                  target="_blank"
                >
                  <Image src={youtube} alt="youtube" />
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="2xl:max-w-[1440px] xl:max-w-[1200px] hidden my-0 mx-auto xl:flex items-start justify-between pt-[8px] pb-[0]">
        <div className="navbar-left">
          <ul className="adress-list flex text-[14px]">
            <li className="adress-item pr-[16px]">
              <div className="adress-link flex items-center justify-center">
                <Image src={location} alt="location" />
                <span className="2xl:w-full pl-[5px] text-[#A2A0B3] xl:w-[300px] xl:pl-0">
                  {locale === "uz"
                    ? "100128, Toshkent shahar, Shayxontohur tumani, Labzak ko‘chasi, 136 uy"
                    : locale === "uzb"
                    ? "100128, Тошкент шаҳар, Шайхонтоҳур тумани, Лабзак кўчаси, 136 уй"
                    : locale === "ru"
                    ? "100128, город Ташкент, Шайхонтохурский район, улица Лабзак, дом 136"
                    : "100128, Tashkent city, Shaykhontokhur district, Labzak street, 136"}
                </span>
              </div>
            </li>
            <li className="text-[#A2A0B3] pr-[16px]">|</li>
            <li className="adress-item">
              <a
                href="#"
                className="adress-link flex items-center justify-center"
              >
                <Image src={mail} alt="mail" />
                <p className="pl-[5px] text-[#A2A0B3]">info@gis.uz</p>
              </a>
            </li>
          </ul>
        </div>
        <div className="navbar-right flex items-start">
          <ul className="flex items-center">
            <li className="social-media-item pr-[15px]">
              <Link
                href="https://www.facebook.com/uzkomnazorat/"
                target="_blank"
                title="facebook"
              >
                <Image src={facebook} alt="facebook" />
              </Link>
            </li>
            <li className="social-media-item pr-[15px]">
              <Link
                href="https://www.instagram.com/uzkomnazorat/"
                target="_blank"
              >
                <Image src={instagram} alt="instagram" />
              </Link>
            </li>
            <li className="social-media-item pr-[15px]">
              <Link href="https://t.me/gisuz" target="_blank">
                <Image src={telegram} alt="telegram" />
              </Link>
            </li>
            <li className="social-media-item pr-[15px]">
              <Link
                href="https://www.youtube.com/channel/UC3ajfdl_uoWLGR1B-eCELWA"
                target="_blank"
              >
                <Image src={youtube} alt="youtube" />
              </Link>
            </li>
            <li className="text-[#A2A0B3] pr-[16px]">|</li>
          </ul>
          <ul className="extra-list flex items-start">
            <li className="extra-item mr-[10px] ">
              <a
                href="#"
                className="relative"
                onClick={() => handleOpenModal()}
              >
                <Image src={eye} alt="eye" width={20} height={20} />
              </a>
              {isOpen ? (
                <div ref={ref}>
                  <div className="eye-modal w-[220px] z-20 absolute p-[20px] bg-[#3A2F7D]">
                    <p className="text-[#8F8F8F] text-[18px]">
                      {t("navbar.site-view")}
                    </p>
                    <ul className="flex items-center justify-between py-[15px] border-[#5C587A] border-b-[2px]">
                      <li>
                        <button
                          className="py-[10px] px-[17px] text-[18px] bg-[#171142]"
                          onClick={() => changeColor(setView("normal"))}
                        >
                          A
                        </button>
                      </li>
                      <li>
                        <button
                          className="py-[10px] px-[17px] text-[18px] bg-[#000]"
                          onClick={() => changeColor(setView("grayscale"))}
                        >
                          A
                        </button>
                      </li>
                      <li>
                        <button
                          className="py-[10px] px-[17px] text-[18px] text-[#000] bg-gray-300"
                          onClick={() => changeColor(setView("grayscale1"))}
                        >
                          A
                        </button>
                      </li>
                    </ul>
                    <p className="my-[10px] text-[18px] text-[#8F8F8F]">
                      {t("navbar.shrift-size")}
                    </p>
                    <input
                      id="range"
                      className="w-full"
                      type="range"
                      min="14"
                      max="20"
                      step="2"
                      onChange={(event) => changeFontSize(event)}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
            </li>
            <li className="extra-item mr-[10px]">
              <a href="#" onClick={() => speechBtnClicked()}>
                <Image src={volume} alt="volume" width={20} height={20} />
              </a>
            </li>
            <li className="text-[#A2A0B3] pr-[16px]">|</li>
          </ul>
          <div className="w-20">
            <div
              onClick={() => setOpen(!open)}
              className="w-full  flex justify-center items-center cursor-pointer rounded"
            >
              <p className="text-[15px] pr-[5px]">{selected}</p>
              {open ? (
                <Icon
                  icon="ep:arrow-up-bold"
                  color="white"
                  width={15}
                  height={15}
                />
              ) : (
                <Icon
                  icon="ep:arrow-down-bold"
                  color="white"
                  width={15}
                  height={15}
                />
              )}
            </div>
            <ul
              className={`${
                open
                  ? "block absolute w-48 h-38 mt-3  pt-1 bg-[#3C3976] cursor-pointer z-10"
                  : "hidden"
              }`}
            >
              <li>
                <a
                  href={`/uz${router.pathname}`}
                  locale="uz"
                  onClick={() => {
                    setSelected("O`zb");
                    setOpen(false);
                  }}
                  className={
                    locale === "uz"
                      ? "px-[10px] py-[8px] block text-sm pointer bg-[#171142] hover:text-white"
                      : "px-[10px] py-[8px] block text-sm pointer bg-[#3C3976] hover:bg-[#171142] hover:text-white"
                  }
                >
                  O`zbek tili
                </a>
              </li>
              <li>
                <a
                  href={`/uzb${router.pathname}`}
                  locale="uzb"
                  onClick={() => {
                    setSelected("Ўзб");
                    setOpen(false);
                  }}
                  className={
                    locale === "uzb"
                      ? "px-[10px] py-[8px] block text-sm pointer bg-[#171142] hover:text-white"
                      : "px-[10px] py-[8px] block text-sm pointer bg-[#3C3976] hover:bg-[#171142] hover:text-white"
                  }
                >
                  Ўзбек тили
                </a>
              </li>
              <li>
                <a
                  href={`/ru${router.pathname}`}
                  locale="ru"
                  onClick={() => {
                    setSelected("Ру");
                    setOpen(false);
                  }}
                  className={
                    locale === "ru"
                      ? "px-[10px] py-[8px] block text-sm pointer bg-[#171142] hover:text-white"
                      : "px-[10px] py-[8px] block text-sm pointer bg-[#3C3976] hover:bg-[#171142] hover:text-white"
                  }
                >
                  Русский язык
                </a>
              </li>
              <li>
                <a
                  href={`/en${router.pathname}`}
                  locale="en"
                  onClick={() => {
                    setSelected("En");
                    setOpen(false);
                  }}
                  className={
                    locale === "en"
                      ? "px-[10px] py-[8px] block text-sm pointer bg-[#171142] hover:text-white"
                      : "px-[10px] py-[8px] block text-sm pointer bg-[#3C3976] hover:bg-[#171142] hover:text-white"
                  }
                >
                  English
                </a>
              </li>
            </ul>
          </div>
          <ul className="flex items-start">
            <li className="pr-[16px]">
              <Link href="/sitemap">
                <Image src={menu} alt="menu" className="w-[20px] h-[20px]" />
              </Link>
            </li>
            <li className="pr-[16px]">
              <button onClick={() => setsearchOpen(!searchopen)}>
                <Icon icon="akar-icons:search" className="w-[24px] h-[24px]" />
                {/* <Image src={searchBtn} alt="search" /> */}
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
          <div className="absolute top-[30%] left-0 bottom-0 right-0  z-30 ml-[20px]">
            <div className="">
              <div className="max-w-[900px] my-0  mx-auto flex flex-col items-center justify-center bg-[#171142]">
                <div className="flex justify-center items-center relative w-full py-[20px] ">
                  <h3 className="text-[25px] text-center">
                    {t("button.search")}
                  </h3>
                  <button
                    className="absolute right-[3%]"
                    onClick={() => setsearchOpen(!searchopen)}
                  >
                    <Icon
                      icon="ph:x-circle-bold"
                      color="white"
                      className="w-[30px] h-[30px]"
                    />
                  </button>
                </div>
                <div className="flex flex-row w-full px-[20px] pb-[30px]">
                  <input
                    type="search"
                    onChange={(event) => setsearch(event.target.value)}
                    className="basis-full xl:basis-4/5 w-full p-[10px]  bg-[#3A2F7D]  bg-[#3A2F7D]"
                  />
                  <button
                    onClick={() => onSubmit()}
                    className="basis-full xl:basis-1/5 w-full opacity-50 hover:bg-white hover:text-[#3C3971] text-white bg-[#3C3971] border border-white"
                  >
                    {t("button.search")}
                  </button>
                </div>
                <div className="pb-[20px] overflow-scroll h-auto w-auto relative">
                  {resData === 0 ? (
                    <div className="pb-[20px] overflow-scroll h-auto w-auto relative">
                      {t("other.no-data")}
                    </div>
                  ) : (
                    <div
                      className={
                        resData != 0 ? "overflow-scroll h-[400px]" : "h-auto"
                      }
                    >
                      {resData.map((r) => (
                        <div key={r.id}>
                          <div className="py-[10px] px-[20px] mb-[10px] mx-[20px] border-[#5C587A] border-[1px] rounded">
                            <Link
                              href={`/${r.sub_menu.slug}/${r.id}`}
                              className=""
                            >
                              <p id="title">{r.title}</p>
                              <p
                                className="text-[#A2A0B3] line-clamp-1"
                                id="description"
                              >
                                {r.description}
                              </p>
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
