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
export const options = {
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
    },
    title: {
      display: false,
      text: "“Oʻzkomnazorat” Davlat inspeksiyasiga kelib tushgan murojaatlar soni",
    },
  },
};

const labels = ["2019"];
export const data = {
  labels,
  hoverOffset: 4,
  datasets: [
    {
      label: "CDMA",
      data: ["1947"],
      backgroundColor: "rgb(73,147,255)",
    },
    {
      label: "4G",
      data: ["5584"],
      backgroundColor: "rgb(124,255,178)",
    },
    {
      label: "3G",
      data: ["1028"],
      backgroundColor: "rgb(253,221,96)",
    },
    {
      label: "2G",
      data: ["16745"],
      backgroundColor: "rgb(255,110,118)",
    },
  ],
};

const page = () => {
  const { locale } = useRouter();
  const [name, setname] = useState();

  const getBarData = async () => {
    const response = await axios.get(
      `/${locale}/api/statistics/?type=horizontal-bar`
    );
    const name = response.data[0].name;
    setname(name);
    console.log(response, "horizontal");
  };

  useEffect(() => {
    getBarData();
  }, []);
  return (
    <div className="mb-[50px] mr-[50px]">
      <h1 className="text-[1.35em] xl:text-[2em] text-[#A2A0B3] py-[10px]">
        {name}
      </h1>
      <Bar options={options} data={data} className="w-full" />
    </div>
  );
};

export default page;