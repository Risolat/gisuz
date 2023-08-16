import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useState, useEffect } from "react";

import axios from "../http";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: [
    "ma'muriy javobgarlikka tortilgan",
    "egallab turgan lavozimidan ozod etildi",
    "Jarima",
    "hayfsan",
  ],
  datasets: [
    {
      label:
        "2019-yilda mansabdor shaxslarga nisbatan koʻrilgan choralar toʻgʻrisida maʼlumot",
      data: [18, 5, 8, 62],
      backgroundColor: [
        "rgb(255,110,118)",
        "rgb(253,221,96)",
        "rgb(124,255,178)",
        "rgb(73,147,255)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
      ],
      borderWidth: 1,
      hoverOffset: 10,
    },
  ],
};

const Draugh = () => {
  const { locale } = useRouter();
  const [name, setname] = useState("");
  const getPieData = async () => {
    const response = await axios.get(`/${locale}/api/statistics/?type=pie`);
    const name = response.data[0].name;
    setname(name);
    console.log(response, "pie");
  };

  useEffect(() => {
    getPieData();
  }, []);
  return (
    <div>
      <h1 className="text-[1.35em] xl:text-[2em] text-[#A2A0B3] py-[10px] mr-[20px]">
        {name}
      </h1>
      <div className="w-96 h-96 my-0 mx-auto">
        <Doughnut className="w-3/5 h-1/2" data={data} />
      </div>
    </div>
  );
};
export default Draugh;
