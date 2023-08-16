import React, { useEffect, useState } from "react";
// import "../app/[locale]/chart.css";
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

export default function Horizontal() {
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    // setChartData({
    //   labels: [
    //     "mahalliy telefon tarmog'i",
    //     "maʼlumotlar uzatish tarmogʻi",
    //     "pochta xizmatlari",
    //     "mobil aloqa xizmati",
    //     "teleradio (KTV efir)",
    //     "boshqa masalalar",
    //   ],
    //   datasets: [
    //     {
    //       label: "",
    //       data: [1961, 2855, 3638, 3638, 544, 243],
    //       borderRadius: 6,
    //       borderColor: "rgb(53, 162, 235)",
    //       backgroundColor: [
    //         "#3D8DFF",
    //         "#3878DD",
    //         "#3467C2",
    //         "#325EB5",
    //         "#3156A7",
    //         "#2F4D9A",
    //         "#3D8DFF",
    //         "#3878DD",
    //       ],
    //     },
    //   ],
    // });
    const interval = setInterval(() => {
      setChartData({
        labels: [
          "mahalliy telefon tarmog'i",
          "maʼlumotlar uzatish tarmogʻi",
          "pochta xizmatlari",
          "mobil aloqa xizmati",
          "teleradio (KTV efir)",
          "boshqa masalalar",
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
    }, 200);

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
    });
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[180px]">
      <Bar className="w-[400px]" options={chartOptions} data={chartData} />
    </div>
  );
}
