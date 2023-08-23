import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useState, useEffect } from "react";

import axios from "../http";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

ChartJS.register(ArcElement, Tooltip, Legend);

const Draugh = () => {
  const { locale } = useRouter();
  const [name, setname] = useState("");
  const getPieData = async () => {
    const response = await axios.get(`/${locale}/api/statistics/?type=pie`);
    const name = response.data[0].name;
    setname(name);
    console.log(response, "pie");
  };
  const data = {
    labels: [
      locale === "uz"
        ? "hayfsan"
        : locale === "uzb"
        ? "ҳайфсан"
        : locale === "ru"
        ? "выговор"
        : "rebuke",
      locale === "uz"
        ? "jarima"
        : locale === "uzb"
        ? "жарима"
        : locale === "ru"
        ? "штраф"
        : "fine",
      locale === "uz"
        ? "egallab turgan lavozimidan ozod etildi"
        : locale === "uzb"
        ? "эгаллаб турган лавозимидан озод этилди"
        : locale === "ru"
        ? "освобождены от занимаемой должности"
        : "relieved of his post",
      locale === "uz"
        ? "maʼmuriy javobgarlikka tortilgan"
        : locale === "uzb"
        ? "маъмурий жавобгарликка тортилган"
        : locale === "ru"
        ? "привлечены к административной ответственности"
        : "brought to administrative responsibility",
    ],
    datasets: [
      {
        label:
          "2019-yilda mansabdor shaxslarga nisbatan koʻrilgan choralar toʻgʻrisida maʼlumot",
        data: [62, 18, 5, 8],
        backgroundColor: [
          "rgb(73,147,255)",
          "rgb(255,110,118)",
          "rgb(253,221,96)",
          "rgb(124,255,178)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
        hoverOffset: 18,
      },
    ],
  };
  useEffect(() => {
    getPieData();
  }, []);
  return (
    <div>
      <h1 className="text-[1.35em] xl:text-[2em] text-[#A2A0B3] py-[10px] mr-[20px] mb-[10px]">
        {locale === "uz"
          ? "2019-yilda mansabdor shaxslarga nisbatan koʻrilgan choralar toʻgʻrisida maʼlumot"
          : locale === "ru"
          ? " Информация о принятых мерах по отношению к ответственным лицам в результате изучения и проверок в 2019 году"
          : locale === "uzb"
          ? "2019 йилда мансабдор шахсларга нисбатан кўрилган чоралар тўғрисида маълумот"
          : "Information on the measures taken in relation to responsible persons as a result of the study and inspections in 2019"}
      </h1>
      <div className="w-[800px] h-[800px] flex items-center justify-center my-0 mx-auto">
        <Doughnut
          className="w-[800px] h-[800px] p-[10px]"
          data={data}
          options={{
            layout: {
              padding: 10,
            },
            plugins: {
              legend: {
                position: "top",
                labels: {
                  color: "#A2A0B3",
                },
                padding: {
                  bottom: 100,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};
export default Draugh;
