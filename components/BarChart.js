import React, { useState, useEffect } from "react";
import axios from "../http";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
    },
  },
};

const labels = ["2019"];

const Barchart = () => {
  const { t } = useTranslation("index");
  const { locale } = useRouter();
  const getBarData = async () => {
    const response = await axios.get(`/${locale}/api/statistics/?type=bar`);
    console.log(response);
  };
  const data = {
    labels,
    datasets: [
      {
        label:
          locale === "uz"
            ? "qabul qilingan obyektlar"
            : locale === "uzb"
            ? "қабул қилинган объектлар"
            : locale === "ru"
            ? "принятые объекты"
            : "qabul qilingan obyektlar",
        data: ["2987"],
        backgroundColor: "rgb(73,147,255)",
      },
      {
        label:
          locale === "uz"
            ? "qabul qilinmagan obyektlar"
            : locale === "uzb"
            ? "қабул қилинмаган объектлар"
            : locale === "ru"
            ? "непринятые объекты"
            : "qabul qilinmagan obyektlar",
        data: ["205"],
        backgroundColor: "rgb(124,255,178)",
      },
      {
        label:
          locale === "uz"
            ? "obyektlarni qabuli uchun tushgan arizalar"
            : locale === "uzb"
            ? "объектларни қабули учун тушган аризалар"
            : locale === "ru"
            ? "поступившие заявки для принятия объектов"
            : "obyektlarni qabuli uchun tushgan arizalar",
        data: ["237"],
        backgroundColor: "rgb(253,221,96)",
      },
      {
        label:
          locale === "uz"
            ? "qabul qilish jarayonidagi obyektlar"
            : locale === "uzb"
            ? "қабул қилиш жараёнидаги объектлар"
            : locale === "ru"
            ? "объекты, которые в процессе принятия"
            : "qabul qilish jarayonidagi obyektlar",
        data: ["1232"],
        backgroundColor: "rgb(255,110,118)",
      },
    ],
  };

  useEffect(() => {
    getBarData();
  }, []);
  return (
    <div>
      <div className="container">
        <div className=" py-[40px]">
          <div className="w-full">
            <Bar options={options} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Barchart;
