import React, { useState, useEffect } from "react";
import axios from "../../http";
import Link from "next/link";
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
import BarChart from "../../components/BarChart.js";
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
export const options = {
  responsive: true,
  layout: {
    padding: {
      top: 10,
    },
  },
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#A2A0B3",
        layout: {
          padding: {
            bottom: 100,
          },
        },
      },
    },
    title: {
      display: false,
    },
  },
};

const labels = ["2019"];

const page = () => {
  const [title, setTitle] = useState();
  const [submenu, setSubmenu] = useState([]);
  const [name1, setname1] = useState("");
  const [name2, setname2] = useState("");
  const { t } = useTranslation("index");
  const { locale } = useRouter();
  const data = {
    labels,
    datasets: [
      {
        label:
          locale === "uz"
            ? "mahalliy telefon tarmogʻi"
            : locale === "uzb"
            ? "маҳаллий телефон тармоғи"
            : locale === "ru"
            ? "местная телефонная связь"
            : "local telephone connection",
        data: ["1961"],
        backgroundColor: "rgb(73,147,255)",
      },
      {
        label:
          locale === "uz"
            ? "maʼlumotlar uzatish tarmogʻi"
            : locale === "uzb"
            ? "маълумотлар узатиш тармоғи"
            : locale === "ru"
            ? "услуги передачи данных"
            : "data services",
        data: ["2855"],
        backgroundColor: "rgb(124,255,178)",
      },
      {
        label:
          locale === "uz"
            ? "pochta xizmatlari"
            : locale === "uzb"
            ? "почта хизматлари"
            : locale === "ru"
            ? "почтовые услуги"
            : "post services",
        data: ["3638"],
        backgroundColor: "rgb(253,221,96)",
      },
      {
        label:
          locale === "uz"
            ? "mobil aloqa xizmati"
            : locale === "uzb"
            ? "мобиль алоқа хизмати"
            : locale === "ru"
            ? "услуги мобильной связи"
            : "mobile communication services",
        data: ["3638"],
        backgroundColor: "rgb(255,110,118)",
      },
      {
        label:
          locale === "uz"
            ? "teleradio (KTV efir)"
            : locale === "uzb"
            ? "телерадио (КТВ эфир)"
            : locale === "ru"
            ? "телерадио (эфир КТВ)"
            : "television and radio (KTV broadcast)",
        data: ["544"],
        backgroundColor: "rgb(88,217,249)",
      },
      {
        label:
          locale === "uz"
            ? "boshqa masalalar"
            : locale === "uzb"
            ? "бошқа масалалар"
            : locale === "ru"
            ? "другие вопросы"
            : "other questions",
        data: ["243"],
        backgroundColor: "rgb(5,192,145)",
      },
    ],
  };
  const getBarData = async () => {
    const response = await axios.get(`/${locale}/api/statistics/?type=bar`);
    console.log(response);
    const name1 = response.data[0].name;
    setname1(name1);
    const name2 = response.data[1].name;
    setname2(name2);
  };
  const getData = async () => {
    const response = await axios.get(`/${locale}/api/menu/`);

    const menuName = ["ACTIVITY"];

    const data = response.data.filter((category) =>
      menuName.includes(category.name)
    );

    const title = data.map((d) => {
      return d.title;
    });
    setTitle(title);
    setSubmenu(data[0].submenu);
  };

  useEffect(() => {
    getData();
    getBarData();
  }, []);
  return (
    <div>
      <div className="container mr-[30px]">
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px] ">
          <div className="2xl:basis-3/4 basis-full w-full pl-[20px] 2xl:pl-0 mb-[20px]">
            <h3 className="text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]">
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
            <h1 className="text-[1.35em] xl:text-[2em] text-[#A2A0B3] py-[20px]  mr-[20px]">
              {locale === "uz"
                ? "Qurilishi tugallangan telekommunikatsiya qurilmalarini davlat tomonidan qabul qilish toʻgʻrisida maʼlumot"
                : locale === "ru"
                ? "Информация о государственной приемке законченных строительством объектов телекоммуникации"
                : locale === "uzb"
                ? "Қурилиши тугалланган телекоммуникация қурилмаларини давлат томонидан қабул қилиш тўғрисида маълумот"
                : "Information on the state acceptance of completed construction of telecommunications facilities"}
            </h1>
            <BarChart className="w-full mb-[50px]" />
            <Draugh className="w-full mb-[50px]" />
            <HorizonatBarChart className="mr-[20px]" />
          </div>
          <div className="sticky top-[197px] 2xl:w-[350px] w-full 2xl:basis-1/4 basis-full mx-[20px] 2xl:mx-0 py-[8px] bg-[#3A2F7D]">
            <p className="mb-[24px] text-[20px] px-[16px]">{title}</p>
            <ul className="">
              {submenu.map((item) => (
                <li key={item.id} className="bg-[#3A2F7D]">
                  {item.slug === "/activity/statistics" ? (
                    <div className="gradientBox  bg-[#3A2F7D]">
                      <Link
                        className="block py-[10px] px-[16px] mx-[3px] hover:bg-[#24224E] bg-[#171142] text-white"
                        href={`${item.slug}`}
                      >
                        {item.title}
                      </Link>
                    </div>
                  ) : (
                    <div className="gradientBox bg-[#3A2F7D]">
                      <Link
                        className="block py-[10px] px-[16px] hover:bg-[#24224E] hover:text-white bg-[#3A2F7D] text-[#A2A0B3]"
                        locale={locale}
                        href={`${item.slug}`}
                      >
                        {item.title}
                      </Link>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
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
