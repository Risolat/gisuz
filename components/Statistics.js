"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { BarChart, Bar, Tooltip } from "recharts";
import Horizontal from "./Horizontal.js";
import PieChart from "./PieChart.js";
import LandingBar from "./LandingBar.js";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import axios from "../http";

export default function Statistics() {
  const { locale } = useRouter();
  const { t } = useTranslation("common");

  return (
    <div className="bg-[#3A2F7D] py-[40px]">
      <div className="container flex flex-col xl:flex-row items-center">
        <div className="lg:basis-3/5 pb-[50px]">
          <h2 className="subtitle font-montserrat ml-[30px] 2xl:ml-0">
            {t("main-page.statistics")}
          </h2>
          <p className="max-w-[500px] text-[#A2A0B3] pr-[30px] mb-[40px] text-[16px] leading-5 ml-[30px] 2xl:ml-0">
            {t("main-page.statistics-text")}
          </p>
          <a
            href="/activity/statistics"
            className="py-[15px] px-[40px] ml-[30px] 2xl:ml-0 border border-[#fff] hover:bg-white hover:text-[#3A2F7D]"
          >
            {t("button.more")}
          </a>
        </div>
        <div className="lg:basis-2/5 flex flex-col lg:flex-row items-stratch">
          <div className="lg:max-w-[280px] max-w-[350px] mb-[10px] bg-[#252356] p-[20px] mx-5">
            <LandingBar />
            <p className="font-[500] pt-[10px] text-[16px] leading-5 text-[#A2A0B3]">
              “Oʻzkomnazorat” inspeksiyasiga kelib tushgan murojaatlar soni
            </p>
          </div>

          <div className="lg:max-w-[280px] max-w-[350px] mb-[10px] bg-[#252356] p-[20px] mx-5">
            <Horizontal className="" />
            <p className="font-[500] pt-[10px] text-[16px] leading-5 text-[#A2A0B3]">
              2020-yil may oyi holatiga uyali aloqa operatorlarining tayanch
              stantsiyalari soni
            </p>
          </div>
          <div className="lg:max-w-[280px] max-w-[350px]  mb-[10px] bg-[#252356] p-[20px] mx-5">
            <PieChart className="" />
            <p className="w-full pt-[10px] font-[500] text-[16px] leading-5 text-[#A2A0B3] line-clamp-3">
              Qurilishi tugallangan telekommunikatsiya qurilmalarini davlat
              tomonidan qabul qilish toʻgʻrisida maʼlumot
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
