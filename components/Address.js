import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import location from "../public/photos/icons/location.svg";
import mail from "../public/photos/mail.svg";

const Address = () => {
  const { locale } = useRouter();
  return (
    <div>
      <ul className="adress-list flex items-start flex-wrap pt-[20px] xl:pt-0 overflow-scroll h-[50px] xl:h-auto xl:text-[14px]">
        <li className="adress-item pr-[16px] mb-[10px]">
          <a href="#" className="adress-link flex items-start">
            <Image src={location} alt="location" />
            <address className="2xl:w-full not-italic pl-[5px] text-[#A2A0B3] xl:w-[300px] xl:pl-0">
              {locale === "uz"
                ? "100128, Toshkent shahar, Shayxontohur tumani, Labzak ko‘chasi, 136 uy"
                : locale === "uzb"
                ? "100128, Тошкент шаҳар, Шайхонтоҳур тумани, Лабзак кўчаси, 136 уй"
                : locale === "ru"
                ? "100128, город Ташкент, Шайхонтохурский район, улица Лабзак, дом 136"
                : "100128, Tashkent city, Shaykhontokhur district, Labzak street, 136"}
            </address>
          </a>
        </li>
        <li className="adress-item mb-[10px]">
          <a href="#" className="adress-link flex items-center justify-center">
            <Image src={mail} alt="mail" />
            <p className="pl-[5px] text-[#A2A0B3]">info@gis.uz</p>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Address;
