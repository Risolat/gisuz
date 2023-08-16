"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import footerLogo from "../public/photos/icons/footerLogo.jpg";
import { useTranslation } from "next-i18next";
import axios from "axios";
import footerImg from "../public/photos/icons/footer-img.png";

const Footer = () => {
  const { t } = useTranslation("common");
  const { locale } = useRouter();
  return (
    <div className="bottom-0 w-full mt-auto z-1 bg-[#3A2F7D] text-[0.875em]">
      <div className="max-w-[1440px] my-0 mx-auto pb-[30px]">
        <div className="flex justify-center xl:justify-between items-center flex-wrap py-[16px] border-[#A2A0B3] border-b-[1px] mx-[20px] 2xl:mx-0">
          <div className="flex items-center flex-wrap">
            <Image
              src={footerLogo}
              alt={footerLogo}
              width={40}
              height={40}
              className="mr-[16px]"
            />
            <p className="font-roboto text-white font-bold text-[1.15em] xl:text-[1.5em]">
              {t("navbar.ozcom-short")}
            </p>
          </div>
          <div className="flex items-center justify-center flex-wrap">
            <form action="#">
              <input
                className="outline-none bg-transparent w-[240px] xl:w-[300px] placeholder:text-[0.89em] text-[1em] px-[12px] text-white focus:ring-offset-1 focus:ring-2 focus:ring-[#1D1A49] focus:z-[22] placeholder:text-[#A2A0B3] py-[10px]"
                type="email"
                placeholder={t("form.appeal-placeholder")}
              />
              <button className="px-[16px] py-[10px] mr-[25px] hover:bg-white hover:text-[#24224E]">
                {t("button.subscribe")}
              </button>
            </form>
            <Link
              href="/interactive_service/appeal"
              className="px-[21px] py-[10px] hover:text-[#24224E] hover:bg-white text-white border border-white bg-[#171142]"
            >
              {t("button.send-appeal")}
            </Link>
          </div>
        </div>
        <div className="flex lg:flex-row justify-between flex-wrap flex-col py-[20px] text-[#A2A0B3]">
          <div className="basis-2/6 px-[10px]">
            <p className="pb-[16px]">{t("footer.copyright")}</p>
            <p>
              {t("footer.remind")}{" "}
              <Link
                className="text-[0.875em] hover:text-blue-500 hover:underline"
                href="https://creativecommons.org/licenses/by/4.0/legalcode"
                target="_blank"
              >
                Creative Commons Attribution 4.0 Internationals
              </Link>
            </p>
          </div>
          <div className="basis-2/6 px-[10px]">
            <p>
              {t("footer.attention-text")}{" "}
              <span className="text-white text-[15px] font-bold">
                Ctrl+Enter
              </span>{" "}
              {t("footer.press-button")}
            </p>
            <Link
              href="https://old1.gis.uz/uz"
              target="_blank"
              className="inline-block mt-[30px] bg-[#171142] shadow-md hover:shadow-2xl transition duration-150 px-[16px] py-[4px] hover-opacity-40 text-[#A2A0B3]"
            >
              {t("other.site-old-version")}
            </Link>
          </div>
          <div className="basis-2/6 pl-[10px] flex flex-col items-end">
            <p className="pb-[16px] text-right">{t("footer.remind")}</p>
            <div className="flex items-center">
              <Link
                target="_blank"
                href="https://technocorp.uz"
                className="font-semibold text-[#45A57D] pr-[5px] uppercase"
              >
                Technocorp
              </Link>
              <p> {t("footer.created-by")}</p>
            </div>
            <Link
              href="https://www.uz/ru/res/visitor/index?id=1445"
              className="mt-[20px]"
              target="_blank"
            >
              <Image src={footerImg} alt="img" width={88} height={31} />
            </Link>
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
export default Footer;
