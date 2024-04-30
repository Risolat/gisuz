import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Lang = () => {
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const { locale } = useRouter();
  const router = useRouter();

  const languages = [
    { name: "O'zb", key: "uz" },
    { name: "Руc", key: "ru" },
    { name: "Eng", key: "en" },
    { name: "Ўзб", key: "uzb" },
  ];
  Cookies.set("lang", "O`zb");

  useEffect(() => {
    setSelected(languages.find((n) => n.key === locale).name);
  }, []);

  return (
    <div>
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
              href={`/uz${router.asPath}`}
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
              href={`/uzb${router.asPath}`}
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
              href={`/ru${router.asPath}`}
              locale="ru"
              onClick={() => {
                setSelected("Руc");
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
              href={`/en${router.asPath}`}
              locale="en"
              onClick={() => {
                setSelected("Eng");
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
  );
};

export default Lang;
