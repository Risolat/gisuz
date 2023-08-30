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
          ? "qabul qilingan obyektlar"
          : locale === "uzb"
          ? "қабул қилинган объектлар"
          : locale === "ru"
          ? "принятые объекты"
          : "accepted objects",
        locale === "uz"
          ? "qabul qilish jarayonidagi obyektlar"
          : locale === "uzb"
          ? "қабул қилиш жараёнидаги объектлар"
          : locale === "ru"
          ? "объекты, которые в процессе принятия"
          : "objects that are in the process of being accepted",
        locale === "uz"
          ? "qabul qilinmagan obyektlar"
          : locale === "uzb"
          ? "unaccepted objects"
          : locale === "ru"
          ? "непринятые объекты"
          : "unaccepted objects",
      ],
      datasets: [
        {
          data: [12, 10, 5],
          backgroundColor: ["#3878DD", "#3D8DFF", "#3467C2"],
          borderColor: [
            "rgb(59 130 246 / 0.5)",
            "rgb(79 123 193 / 50%)",
            "#3D8DFF",
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
              ? "qabul qilingan obyektlar"
              : locale === "uzb"
              ? "қабул қилинган объектлар"
              : locale === "ru"
              ? "принятые объекты"
              : "accepted objects",
            locale === "uz"
              ? "qabul qilish jarayonidagi obyektlar"
              : locale === "uzb"
              ? "қабул қилиш жараёнидаги объектлар"
              : locale === "ru"
              ? "объекты, которые в процессе принятия"
              : "objects that are in the process of being accepted",
            locale === "uz"
              ? "qabul qilinmagan obyektlar"
              : locale === "uzb"
              ? "unaccepted objects"
              : locale === "ru"
              ? "непринятые объекты"
              : "unaccepted objects",
          ],
          datasets: [
            {
              data: [12, 10, 5],
              backgroundColor: ["#3D8DFF", "#3467C2", "#3D8DFF"],
              borderColor: [
                "rgb(59 130 246 / 0.5)",
                "rgb(79 123 193 / 50%)",
                "#3D8DFF",
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
