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

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export default function Horizontal() {
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      datasets: [
        {
          data: [1300, 1200, 1000, 1188, 1200, 1000, 1188],
        },
      ],
    });
    setChartData({
      labels: ["2G", "3G", "4G", "CDMA"],
      datasets: [
        {
          label: "",
          data: [1300, 1200, 1000, 1188, 1200, 1000, 1188],
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
      },
      indexAxis: "y",
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
          labels: ["2G", "3G", "4G", "CDMA"],
          datasets: [
            {
              label: "",
              data: [1300, 1200, 1000, 1188, 1200, 1000, 1188],
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
