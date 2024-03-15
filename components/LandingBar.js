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
  const { locale } = useRouter();

  useEffect(() => {
    setChartData({
      labels: [
        locale === "uz"
          ? "Mahalliy telefon xizmatlari"
          : locale === "uzb"
          ? "Маҳаллий телефон хизматлари"
          : locale === "ru"
          ? "Местные телефонные услуги"
          : "local telephone connection",
        locale === "uz"
          ? "maʼlumotlar uzatish tarmogʻi"
          : locale === "uzb"
          ? "Mаълумотлар узатиш тармоғи"
          : locale === "ru"
          ? "услуги передачи данных"
          : "data services",
        locale === "uz"
          ? "Mualliflik huquqi"
          : locale === "uzb"
          ? "Муаллифлик ҳуқуқи"
          : locale === "ru"
          ? "Авторские права"
          : "Mualliflik huquqi",
        locale === "uz"
          ? "Pochta xizmati va matbuot xizmati"
          : locale === "uzb"
          ? "Почта хизмати ва матбуот хизмати"
          : locale === "ru"
          ? "Почтовая служба и пресс-служба"
          : "Pochta xizmati va matbuot xizmati",
        locale === "uz"
          ? "AKT yo‘nalishi bo‘yicha"
          : locale === "uzb"
          ? "АКТ йўналиши бўйича"
          : locale === "ru"
          ? "В сфере ИКТ"
          : "AKT yo‘nalishi bo‘yicha",
        locale === "uz"
          ? "Korrupsiyaga qarshi kurash yo‘nalishi bo‘yicha"
          : locale === "uzb"
          ? "Коррупцияга қарши кураш йўналиши бўйича"
          : locale === "ru"
          ? "По направлению борьбы с коррупцией"
          : "Korrupsiyaga qarshi kurash yo‘nalishi bo‘yicha",
        locale === "uz"
          ? "Mobil aloqa xizmatlar sifati"
          : locale === "uzb"
          ? "Мобил алоқа хизматлар сифати"
          : locale === "ru"
          ? "Качество услуг мобильной связи"
          : "Mobil aloqa xizmatlar sifati",
        locale === "uz"
          ? "Teleradio aloqa xizmatlari"
          : locale === "uzb"
          ? "Телерадио алоқа хизматлари"
          : locale === "ru"
          ? "Услуги телерадиосвязи"
          : "Teleradio aloqa xizmatlari",
        locale === "uz"
          ? "Axborot xavfsizligi yo‘nalishi"
          : locale === "uzb"
          ? "Ахборот хавфсизлиги йўналиши"
          : locale === "ru"
          ? "Направление информационной безопасности"
          : "Axborot xavfsizligi yo‘nalishi",
        locale === "uz"
          ? "Boshqa masalalar"
          : locale === "uzb"
          ? "Бошқа масалалар"
          : locale === "ru"
          ? "Другие вопросы"
          : "other questions",
      ],
      datasets: [
        {
          label: "",
          data: [23, 476, 0, 14, 1, 0, 365, 30, 0, 20],
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
              ? "Mahalliy telefon xizmatlari"
              : locale === "uzb"
              ? "Маҳаллий телефон хизматлари"
              : locale === "ru"
              ? "Местные телефонные услуги"
              : "local telephone connection",
            locale === "uz"
              ? "maʼlumotlar uzatish tarmogʻi"
              : locale === "uzb"
              ? "Mаълумотлар узатиш тармоғи"
              : locale === "ru"
              ? "услуги передачи данных"
              : "data services",
            locale === "uz"
              ? "Mualliflik huquqi"
              : locale === "uzb"
              ? "Муаллифлик ҳуқуқи"
              : locale === "ru"
              ? "Авторские права"
              : "Mualliflik huquqi",
            locale === "uz"
              ? "Pochta xizmati va matbuot xizmati"
              : locale === "uzb"
              ? "Почта хизмати ва матбуот хизмати"
              : locale === "ru"
              ? "Почтовая служба и пресс-служба"
              : "Pochta xizmati va matbuot xizmati",
            locale === "uz"
              ? "AKT yo‘nalishi bo‘yicha"
              : locale === "uzb"
              ? "АКТ йўналиши бўйича"
              : locale === "ru"
              ? "В сфере ИКТ"
              : "AKT yo‘nalishi bo‘yicha",
            locale === "uz"
              ? "Korrupsiyaga qarshi kurash yo‘nalishi bo‘yicha"
              : locale === "uzb"
              ? "Коррупцияга қарши кураш йўналиши бўйича"
              : locale === "ru"
              ? "По направлению борьбы с коррупцией"
              : "Korrupsiyaga qarshi kurash yo‘nalishi bo‘yicha",
            locale === "uz"
              ? "Mobil aloqa xizmatlar sifati"
              : locale === "uzb"
              ? "Мобил алоқа хизматлар сифати"
              : locale === "ru"
              ? "Качество услуг мобильной связи"
              : "Mobil aloqa xizmatlar sifati",
            locale === "uz"
              ? "Teleradio aloqa xizmatlari"
              : locale === "uzb"
              ? "Телерадио алоқа хизматлари"
              : locale === "ru"
              ? "Услуги телерадиосвязи"
              : "Teleradio aloqa xizmatlari",
            locale === "uz"
              ? "Axborot xavfsizligi yo‘nalishi"
              : locale === "uzb"
              ? "Ахборот хавфсизлиги йўналиши"
              : locale === "ru"
              ? "Направление информационной безопасности"
              : "Axborot xavfsizligi yo‘nalishi",
            locale === "uz"
              ? "Boshqa masalalar"
              : locale === "uzb"
              ? "Бошқа масалалар"
              : locale === "ru"
              ? "Другие вопросы"
              : "other questions",
          ],
          datasets: [
            {
              label: "",
              data: [23, 476, 0, 14, 1, 0, 365, 30, 0, 20],
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
