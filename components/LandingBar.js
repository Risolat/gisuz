import React, { useEffect, useState } from "react";
import axios from "../http";
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
import { useRouter } from "next/router";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Horizontal() {
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});
  const [indicators, setIndicators] = useState([]);
  const { locale } = useRouter();

  // const getData = async () => {
  //   const response = await axios.get(`/${locale}/api/statistics/?type=bar`);
  //   console.log(response);
  //   const indicators = response.data.indicators;
  //   setIndicators(indicators);
  // };
  useEffect(() => {
    setChartData({
      labels: [
        locale === "uz"
          ? "mahalliy telefon tarmogʻi"
          : locale === "uzb"
          ? "маҳаллий телефон тармоғи"
          : locale === "ru"
          ? "местная телефонная связь"
          : "local telephone connection",
        locale === "uz"
          ? "maʼlumotlar uzatish tarmogʻi"
          : locale === "uzb"
          ? "маълумотлар узатиш тармоғи"
          : locale === "ru"
          ? "услуги передачи данных"
          : "data services",
        locale === "uz"
          ? "pochta xizmatlari"
          : locale === "uzb"
          ? "почта хизматлари"
          : locale === "ru"
          ? "почтовые услуги"
          : "post services",
        locale === "uz"
          ? "mobil aloqa xizmati"
          : locale === "uzb"
          ? "мобиль алоқа хизмати"
          : locale === "ru"
          ? "услуги мобильной связи"
          : "mobile communication services",
        locale === "uz"
          ? "teleradio (KTV efir)"
          : locale === "uzb"
          ? "телерадио (КТВ эфир)"
          : locale === "ru"
          ? "телерадио (эфир КТВ)"
          : "television and radio (KTV broadcast)",
        locale === "uz"
          ? "boshqa masalalar"
          : locale === "uzb"
          ? "бошқа масалалар"
          : locale === "ru"
          ? "другие вопросы"
          : "other questions",
      ],
      datasets: [
        {
          label: "",
          data: [1961, 2855, 3638, 3638, 544, 243],
          borderRadius: 6,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: [
            "#3D8DFF",
            "#3878DD",
            "#3467C2",
            "#325EB5",
            "#3156A7",
            "#2F4D9A",
            "#3D8DFF",
            "#3878DD",
          ],
        },
      ],
    });
    setChartOptions({
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
      indexAxis: "x",
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
          text: "",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
      // animations: {
      //   tension: {
      //     duration: 1000,
      //     easing: "linear",
      //     from: 1,
      //     to: 0,
      //     loop: true,
      //   },
      // },
    });
    const interval = setInterval(() => {
      setChartData({
        datasets: [
          {
            data: [],
          },
        ],
      });
      setTimeout(() => {
        setChartData({
          labels: [
            locale === "uz"
              ? "mahalliy telefon tarmogʻi"
              : locale === "uzb"
              ? "маҳаллий телефон тармоғи"
              : locale === "ru"
              ? "местная телефонная связь"
              : "local telephone connection",
            locale === "uz"
              ? "maʼlumotlar uzatish tarmogʻi"
              : locale === "uzb"
              ? "маълумотлар узатиш тармоғи"
              : locale === "ru"
              ? "услуги передачи данных"
              : "data services",
            locale === "uz"
              ? "pochta xizmatlari"
              : locale === "uzb"
              ? "почта хизматлари"
              : locale === "ru"
              ? "почтовые услуги"
              : "post services",
            locale === "uz"
              ? "mobil aloqa xizmati"
              : locale === "uzb"
              ? "мобиль алоқа хизмати"
              : locale === "ru"
              ? "услуги мобильной связи"
              : "mobile communication services",
            locale === "uz"
              ? "teleradio (KTV efir)"
              : locale === "uzb"
              ? "телерадио (КТВ эфир)"
              : locale === "ru"
              ? "телерадио (эфир КТВ)"
              : "television and radio (KTV broadcast)",
            locale === "uz"
              ? "boshqa masalalar"
              : locale === "uzb"
              ? "бошқа масалалар"
              : locale === "ru"
              ? "другие вопросы"
              : "other questions",
          ],
          datasets: [
            {
              label: "",
              data: [1961, 2855, 3638, 3638, 544, 243],
              borderRadius: 6,
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: [
                "#3D8DFF",
                "#3878DD",
                "#3467C2",
                "#325EB5",
                "#3156A7",
                "#2F4D9A",
                "#3D8DFF",
                "#3878DD",
              ],
            },
          ],
        });
      }, 100);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[180px]">
      <Bar className="w-[400px]" options={chartOptions} data={chartData} />
    </div>
  );
}
