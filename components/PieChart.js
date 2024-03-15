import React from "react";
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

ChartJS.register(ArcElement, Tooltip, Legend);

const pieChart = () => {
  const { locale } = useRouter();
  const [dataPie, setDataPie] = useState({
    labels: [],
    datasets: [],
  });
  const [options, setOptions] = useState({});

  useEffect(() => {
    setOptions({
      plugins: {
        legend: {
          display: false,
        },
      },
    });
    setDataPie({
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
          data: [62, 8, 5, 18],
          backgroundColor: ["#3467C2", "#3878DD", "#3467C2", "#3D8DFF"],
          borderColor: [
            "rgb(59 130 246 / 0.5)",
            "rgb(79 123 193 / 50%)",
            "#3D8DFF",
            "rgb(59 130 246 / 0.8)",
          ],
          borderWidth: 1,
        },
      ],
    });
    const interval = setInterval(() => {
      setDataPie({
        labels: [],
        datasets: [
          {
            data: [],
          },
        ],
      });
      setTimeout(() => {
        setDataPie({
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
              data: [62, 8, 5, 18],
              backgroundColor: ["#3467C2", "#3878DD", "#3467C2", "#3D8DFF"],
              borderColor: [
                "rgb(59 130 246 / 0.5)",
                "rgb(79 123 193 / 50%)",
                "#3D8DFF",
                "rgb(59 130 246 / 0.8)",
              ],
              borderWidth: 1,
            },
          ],
        });
      }, 100);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-[200px] h-[180px] flex items-center justify-center">
      <Doughnut
        data={dataPie}
        options={options}
        className="w-[150px] h-[150px]"
      />
    </div>
  );
};

export default pieChart;
