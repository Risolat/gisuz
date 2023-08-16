import React from "react";
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const pieChart = () => {
  const dataPie = {
    labels: [
      "Qabul qilingan obyektlar",
      "Qabul qilish jarayonidagi obyektlar",
      "Qabul qilinmagan obyektlar",
    ],
    // options: {
    //   plugins: {
    //     legend: {
    //       display: false,
    //     },
    //   },
    // },
    datasets: [
      {
        data: [12, 10, 5],
        backgroundColor: ["#3D8DFF", "#3467C2", "#3D8DFF", "#3878DD"],
        borderColor: [
          "rgb(59 130 246 / 0.5)",
          "rgb(79 123 193 / 50%)",
          "#3D8DFF",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="w-[200px] h-[180px] flex items-center justify-center">
      <Doughnut
        data={dataPie}
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
        className="w-[150px] h-[150px]"
      />
    </div>
  );
};

export default pieChart;
