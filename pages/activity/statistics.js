import React, { useState, useEffect } from "react";
import axios from "../../http";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../next-i18next.config";
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
import Draugh from "../../components/Draugh";
import HorizonatBarChart from "../../components/HorizontalBarChart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { Montserrat } from "next/font/google";
import Head from "next/head";
import Sidebar from "@/components/Sidebar";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
export const options = {
  responsive: true,
  layout: {
    // padding: 10,
  },
  indexAxis: "y",
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#A2A0B3",
        padding: 0,
      },
    },
    title: {
      display: false,
    },
  },
};

const page = () => {
  const [indicators, setIndicators] = useState([]);
  const [indicatorsNum, setIndicatorsNum] = useState([]);
  const [indicatorSecond, setIndicatorSecond] = useState([]);
  const [indicatorsNumSecond, setIndicatorsNumSecond] = useState([]);

  const { t } = useTranslation("index");
  const { locale } = useRouter();
  const getBarData = async () => {
    const response = await axios.get(
      `/${locale}/api/statistics/?type=horizontal-bar`
    );
    const response1 = await axios.get(
      `/${locale}/api/statistics/?type=horizontal-bar`
    );
    const indicatorSecond = response.data[1].indicators.map((item) => {
      return item.indicator_name;
    });
    const indicatorsNumSecond = response.data[1].indicators.map((item) => {
      return item.indicator_number;
    });
    setIndicatorSecond(indicatorSecond);
    setIndicatorsNumSecond(indicatorsNumSecond);
    const result = response.data[0].indicators.map((item) => {
      return item.indicator_name;
    });
    const resultNumber = response.data[0].indicators.map((item) => {
      return item.indicator_number;
    });
    setIndicatorsNum(resultNumber);
    setIndicators(result);
    console.log(result);
  };
  const backgroundColors = [
    "rgb(73,147,255)",
    "rgb(255,110,118",
    "rgb(88,217,249)",
    "rgb(5,192,145)",
    "rgb(153, 102, 255)",
    "rgb(255, 159, 64)",
    "rgb(254,221,96)",
  ];
  const data = {
    labels: indicators,
    datasets: [
      {
        label: "2024",
        data: indicatorsNum,
        backgroundColor: [
          "rgb(73,147,255)",
          "rgb(255,110,118",
          "rgb(88,217,249)",
          "rgb(5,192,145)",
          "rgb(153, 102, 255)",
          "rgb(255, 159, 64)",
          "rgb(254,221,96)",
        ],
      },
    ],
  };

  useEffect(() => {
    getBarData();
  }, []);
  return (
    <div>
      <Head>
        <title>{t("main-page.statistics")}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={t("main-page.statistics")} />
        <meta
          property="og:title"
          content={t("main-page.statistics")}
          key="title"
        />
        <meta name="title" content={t("main-page.statistics")} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gis.uz/activity/statistics" />
        <meta property="og:title" content="Oʻzkomnazorat - Statistika" />
        <meta property="og:description" content={t("main-page.statistics")} />
        <meta
          property="twitter:url"
          content="https://gis.uz/activity/statistics"
        />
        <meta
          property="twitter:title"
          content={`Oʻzkomnazorat - ${t(
            "page-titles.activity.anticorruption"
          )}`}
        />
        <meta
          property="twitter:description"
          content={t("main-page.statistics")}
        />
        <meta
          property="og:title"
          content={t("main-page.statistics")}
          key="title"
        />
      </Head>
      <div className="container mr-[30px]">
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px] ">
          <div className="2xl:basis-3/4 basis-full w-full px-[20px] 2xl:pl-0 mb-[20px]">
            <h3
              className={`${montserrat.variable} text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px`}
            >
              {t("main-page.statistics")}
            </h3>
            <h1 className="text-[1.35em] xl:text-[2em] text-[#A2A0B3] py-[10px]">
              {locale === "uz"
                ? "“Oʻzkomnazorat” inspeksiyasiga kelib tushgan murojaatlar soni"
                : locale === "ru"
                ? "Количество обращений, поступивших в инспекцию «Узкомназорат»"
                : locale === "uzb"
                ? "“Ўзкомназорат” инспекциясига келиб тушган мурожаатлар сони"
                : "The number of appeals received by the inspection ”Uzkomnazorat”"}
            </h1>
            <Bar options={options} data={data} className="w-full mb-[50px]" />
            <Draugh className="w-full mb-[50px]" />
            <HorizonatBarChart
              className="mr-[20px]"
              labels={indicatorSecond}
              indicatorsNumSecond={indicatorsNumSecond}
            />
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ["common", "index", "navbar"],
        i18nextConfig
      )),
    },
  };
}
export default page;
