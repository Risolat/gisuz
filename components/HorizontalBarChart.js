import { useState, useEffect } from "react";
import axios from "../http";
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
// import BarChart from "../../../../components/BarChart.js";
// import Draugh from "../../../../components/Draugh";
// import { useLocale, useTranslations } from "next-intl";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const page = ({ labels, indicatorsNumSecond }) => {
  const { locale } = useRouter();
  const [name, setname] = useState();

  const getBarData = async () => {
    const response = await axios.get(`/${locale}/api//?type=horizontal-bar`);
    const name = response.data[0].name;
    setname(name);
  };
  const options = {
    indexAxis: "y",
    responsive: true,
    animations: {
      tension: {
        duration: 1000,
        easing: "easeInQuad",
        from: 1,
        to: 0,
        loop: true,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#A2A0B3",
        },
      },
      title: {
        display: false,
        text: "“Oʻzkomnazorat” inspeksiyasiga kelib tushgan murojaatlar soni",
      },
    },
  };

  // const labels = ["2023"];
  const data = {
    labels: labels,
    hoverOffset: 4,
    datasets: [
      {
        label: "2023",
        data: indicatorsNumSecond,
        backgroundColor: [
          "rgb(73,147,255)",
          "rgb(124,255,178)",
          "rgb(253,221,96)",
          "rgb(255,110,118)",
          "rgb(255,110,60)",
        ],
      },
    ],
  };
  useEffect(() => {
    // getBarData();
  }, []);
  return (
    <div className="mb-[50px] mr-[50px]">
      <h1 className="text-[1.35em] xl:text-[2em] text-[#A2A0B3] py-[10px] max-w-[1000px]">
        {locale === "uz"
          ? "2023-yil noyabr oyi holatiga uyali aloqa operatorlarining tayanch stansiyalari soni"
          : locale === "ru"
          ? "Количество базовых станций мобильных операторов ноябрь 2023 г."
          : locale === "uzb"
          ? "2023 йил ноябрь ойи ҳолатига уяли алоқа операторларининг таянч станциялари сони"
          : "Number of base stations of mobile operators November 2023"}
      </h1>
      <Bar options={options} data={data} className="w-full" />
    </div>
  );
};

export default page;
