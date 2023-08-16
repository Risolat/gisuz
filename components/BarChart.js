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
export const data = {
  labels,
  datasets: [
    {
      label: "qabul qilingan obyektlar",
      data: ["2987"],
      backgroundColor: "rgb(73,147,255)",
    },
    {
      label: "qabul qilinmagan obyektlar",
      data: ["205"],
      backgroundColor: "rgb(124,255,178)",
    },
    {
      label: "obyektlarni qabuli uchun tushgan arizalar",
      data: ["237"],
      backgroundColor: "rgb(253,221,96)",
    },
    {
      label: "qabul qilish jarayonidagi obyektlar",
      data: ["1232"],
      backgroundColor: "rgb(255,110,118)",
    },
  ],
};

const Barchart = () => {
  const { t } = useTranslation("index");
  const { locale } = useRouter();
  const getBarData = async () => {
    const response = await axios.get(`/${locale}/api/statistics/?type=bar`);
    console.log(response);
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
