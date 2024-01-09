import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import footerLogo from "../public/photos/icons/footerLogo.jpg";
import { useTranslation } from "next-i18next";
import footerImg from "../public/photos/icons/footer-img.png";
import { Roboto } from "next/font/google";
import Subscription from "./Subscription.js";
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: "500",
});

const Footer = () => {
  const { t } = useTranslation("common");
  const { locale } = useRouter();

  return (
    <div
      className={`${roboto.variable} bottom-0 w-full mt-auto z-1 bg-[#3A2F7D]`}
    >
      <div className="max-w-[1440px] my-0 mx-auto pb-[30px]">
        <div className="flex justify-center lg:justify-between items-center flex-wrap py-[16px] border-[#A2A0B3] border-b-[1px] mx-[20px] 2xl:mx-0">
          <div className="flex items-center">
            <Image
              src={footerLogo}
              alt={footerLogo}
              width={40}
              height={40}
              className="mr-2 md:mr-[16px]"
            />
            <p className="font-roboto text-white font-bold text-[1.15em] xl:text-[24px]">
              {locale === "uz"
                ? "“OʻZKOMNAZORAT” INSPEKSIYASI"
                : locale === "ru"
                ? "ИНСПЕКЦИЯ «УЗКОМНАЗОРАТ"
                : locale === "uzb"
                ? "“ЎЗКОМНАЗОРАТ” ИНСПEКЦИЯСИ"
                : "INSPECTION “UZKOMNAZORAT"}
            </p>
          </div>
          <div className="font-roboto font-normal flex items-center justify-center flex-wrap text-[14px]">
            <Subscription />
            <Link
              href="/interactive_service/appeal"
              className="px-[21px] py-[10px] hover:text-[#24224E] hover:bg-white text-white border border-white bg-[#171142]"
            >
              {locale === "uz"
                ? "Murojaat yuborish"
                : locale === "ru"
                ? "Отправить обращение"
                : locale === "uzb"
                ? "Мурожаат юбориш"
                : "Send an appeal"}
            </Link>
          </div>
        </div>
        <div className="flex lg:flex-row justify-between flex-wrap flex-col font-roboto font-thin  py-[20px] text-[#A2A0B3] text-[14px]">
          <div className="basis-2/6 px-[10px]">
            <p className="pb-[16px]">
              {locale === "uz"
                ? "Copyright © 2019 - 2022 Oʻzbekiston Respublikasi Axborotlashtirish va telekommunikatsiyalar sohasida nazorat boʻyicha davlat inspeksiyasi rasmiy veb-sayti. Mualliflik huquqlari himoyalangan"
                : locale === "ru"
                ? "Copyright © 2019 - 2022 Официальный веб-сайт Государственной инспекции по контролю в сфере информатизации и телекоммуникаций Республики Узбекистан. Авторские права защищены"
                : locale === "uzb"
                ? "Copyright © 2019 - 2022 Ўзбекистон Республикаси Ахборотлаштириш ва телекоммуникациялар соҳасида назорат бўйича давлат инспексияси расмий веб-сайти. Муаллифлик ҳуқуқлари ҳимояланган"
                : "Copyright © 2019 - 2022 Official website of the State Inspection on Control in the Field of Information and Telecommunications of the Republic of Uzbekistan."}
            </p>
            <p>
              {locale === "uz"
                ? "Veb-saytdan olingan maʼlumotlar chop etilganda veb-saytga havola qilish majburiy"
                : locale === "ru"
                ? "При использовании материалов ссылка на веб-сайт обязательна"
                : locale === "uzb"
                ? "Веб-сайтдан олинган маълумотлар чоп этилганда веб-сайтга ҳавола қилиш мажбурий"
                : "When using materials, a link to the website is required"}{" "}
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
              {locale === "uz"
                ? "Diqqat! Agar siz matnda xatoliklarni aniqlasangiz, ularni belgilab, ma’muriyatni xabardor qilish uchun"
                : locale === "ru"
                ? "Внимание! Если Вы нашли ошибку в тексте, выделите её и нажмите"
                : locale === "uzb"
                ? "Диққат! Агар сиз матнда хатоликларни аниқласангиз, уларни белгилаб, маъмуриятни хабардор қилиш учун"
                : "Attention! If you find an error in the text, select it and press"}{" "}
              <span className="text-white text-[15px] font-bold">
                Ctrl+Enter
              </span>{" "}
              {locale === "uz"
                ? "tugmalarini bosing"
                : locale === "ru"
                ? "для уведомления администрации"
                : locale === "uzb"
                ? "тугмаларини босинг"
                : "to notify the administration"}
            </p>
            <Link
              href="https://old1.gis.uz/uz"
              target="_blank"
              className="inline-block mt-[30px] bg-[#171142] shadow-md hover:shadow-2xl transition duration-150 px-[16px] py-[4px] hover-opacity-40 text-[#A2A0B3] text-[16px]"
            >
              {locale === "uz"
                ? "Saytning eski talqini"
                : locale === "ru"
                ? "Старая версия сайта"
                : locale === "uzb"
                ? "Сайтнинг эски талқини"
                : "Old site version"}
            </Link>
          </div>
          <div className="basis-2/6 pl-[10px] pr-3 flex flex-col items-end">
            <p className="pb-[16px] text-right">
              {locale === "uz"
                ? "Veb-saytdan olingan maʼlumotlar chop etilganda veb-saytga havola qilish majburiy"
                : locale === "ru"
                ? "При использовании материалов ссылка на веб-сайт обязательна"
                : locale === "uzb"
                ? "Веб-сайтдан олинган маълумотлар чоп этилганда веб-сайтга ҳавола қилиш мажбурий"
                : "When using materials, a link to the website is required"}
            </p>
            <div className="text-[16px] text-white">
              {locale === "uz" && locale === "uzb"
                ? "hidden"
                : locale === "ru"
                ? "Разработано"
                : locale === "en"
                ? "Developed by"
                : ""}
              <Link
                target="_blank"
                href="https://technocorp.uz"
                className="font-semibold text-[#45A57D]  px-[5px] uppercase"
              >
                Technocorp
              </Link>
              {locale === "ru" && locale === "en"
                ? "hidden"
                : locale === "uz"
                ? "tomonidan ishlab chiqilgan"
                : locale === "uzb"
                ? "томонидан ишлаб чиқилган"
                : ""}
            </div>
            <Link
              href="https://www.uz/ru/res/visitor/index?id=1445"
              className="mt-[20px]"
              target="_blank"
            >
              <img
                src="https://cnt0.www.uz/counter/collect?id=1445&r=&pg=https%3A//gis.uz/info_service/news&c=Y&j=N&wh=1920x1080&px=24&js=1.3&col=0063AF&t=ffffff&p=E6850F"
                alt="img"
                width={88}
                height={31}
              />
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
