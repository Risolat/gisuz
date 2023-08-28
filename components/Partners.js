import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "../http";
import partners from "../public/photos/main/partners.svg";
import gerb from "../public/photos/main/Gerb.svg";
import Link from "next/link";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const Partners = () => {
  const { t } = useTranslation("common");
  const { locale } = useRouter();
  const responsive = {
    0: { items: 1 },
    850: { items: 2 },
    1160: { items: 3 },
    1360: { items: 4 },
  };
  const [partners, setPartners] = useState([]);
  const getPartners = async () => {
    const response =
      await axios.get(`/${locale}/api/partners/?0=p&1=a&2=r&3=t&4=n&5=e&6=r&7=s
    `);
    const partners = response.data;

    setPartners(partners);
  };
  const items = partners.map((p, i) => (
    <div className="item mx-[10px]" key={i} data-value="1">
      <div className="hover:box-border gradientSolidBox">
        <Link href={p.link} className="">
          <div className="hover:bg-[#24224E] h-[174px] m-0 flex flex-col items-center px-[12px] pt-[24px] pb-[42px] bg-[#3A2F7D]">
            <img
              width="70"
              height="62"
              src={p.photo}
              alt="partners"
              className="w-full h-[62px] mb-[10px] object-contain"
            />
            <h5 className="text-[16px] h-[30px] text-center leading-5 pb-[16px] text-[#A2A0B3]">
              {p.title}
            </h5>
          </div>
        </Link>
      </div>
    </div>
  ));

  useEffect(() => {
    getPartners();
  }, []);
  return (
    <div className="container z-1">
      <h2 className="subtitle ml-[30px] 2xl:ml-0">{t("main-page.sponsors")}</h2>
      <div className="relative w-auto 2xl:max-w-[1440px] my-0 mx-auto px-[40px] mb-[120px] z-1">
        <AliceCarousel
          mouseTracking
          items={items}
          responsive={{
            0: { items: 1 },
            850: { items: 2 },
            1160: { items: 3 },
            1360: { items: 3 },
            1450: { items: 4 },
          }}
          // autoPlay={true}
          // autoPlayInterval="2000"
          infinite={true}
          disableButtonsControls
        />
      </div>
    </div>
  );
};

export default Partners;
