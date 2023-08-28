import Horizontal from "./Horizontal.js";
import PieChart from "./PieChart.js";
import LandingBar from "./LandingBar.js";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Roboto } from "next/font/google";
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: "500",
});

export default function Statistics() {
  const { locale } = useRouter();
  const { t } = useTranslation("common");

  return (
    <div className="bg-[#3A2F7D] py-[40px]">
      <div className="container flex flex-col xl:flex-row items-center">
        <div className="lg:basis-3/5 pb-[50px] text-center xl:text-left">
          <h2 className="subtitle font-montserrat ml-[30px] 2xl:ml-0">
            {t("main-page.statistics")}
          </h2>
          <p className="max-w-[500px] text-[#A2A0B3] leading-6 pr-[30px] mb-[40px] text-[16px] leading-5 ml-[30px] 2xl:ml-0">
            {t("main-page.statistics-text")}
          </p>

          <button
            className={`${roboto.variable} font-roboto py-[13px] leading-6 text-[16px] px-[47px] ml-[30px] 2xl:ml-0 border-[2px] border-[#fff] hover:bg-white hover:text-[#3A2F7D]`}
          >
            <a locale={locale} href={`${locale}/activity/statistics`}>
              {t("button.more")}
            </a>
          </button>
        </div>
        <div className="lg:basis-2/5 flex flex-col lg:flex-row items-stratch">
          <div className="xl:w-[250px] 2xl:w-[290px] max-w-[290px] sm:max-w-[350px] pt-[33px] pb-[25px] px-[16px] mb-[10px] bg-[#252356] sm:mx-5">
            <LandingBar />
            <p className="font-medium pt-[10px] text-[16px] leading-6 text-[#A2A0B3] line-clamp-4">
              {locale === "uz"
                ? "“Oʻzkomnazorat” inspeksiyasiga kelib tushgan murojaatlar soni"
                : locale === "ru"
                ? "Количество обращений, поступивших в инспекцию «Узкомназорат»"
                : locale === "uzb"
                ? "“Ўзкомназорат” инспекциясига келиб тушган мурожаатлар сони"
                : "The number of appeals received by the inspection ”Uzkomnazorat”"}
            </p>
          </div>

          <div className="xl:w-[250px] 2xl:w-[290px] max-w-[280px] sm:max-w-[350px] mb-[10px] bg-[#252356] pt-[33px] pb-[25px] px-[16px] sm:mx-5">
            <Horizontal className="" />
            <p className="font-medium pt-[10px] text-[16px] leading-6 text-[#A2A0B3] line-clamp-4">
              {locale === "uz"
                ? "2020-yil may oyi holatiga uyali aloqa operatorlarining tayanch stansiyalari soni"
                : locale === "ru"
                ? "Количество базовых станций мобильных операторов май 2020 г."
                : locale === "uzb"
                ? "2020 йил май ойи ҳолатига уяли алоқа операторларининг таянч станциялари сони"
                : "Number of base stations of mobile operators May 2020"}
            </p>
          </div>
          <div className="xl:w-[250px] 2xl:w-[290px] flex flex-col items-center max-w-[280px] sm:max-w-[350px] mb-[10px] bg-[#252356] pt-[33px] pb-[25px] px-[16px] sm:mx-5">
            <PieChart className="" />
            <p className="font-medium pt-[10px] text-[16px] leading-6 text-[#A2A0B3] line-clamp-4">
              {locale === "uz"
                ? "Qurilishi tugallangan telekommunikatsiya qurilmalarini davlat tomonidan qabul qilish toʻgʻrisida maʼlumot"
                : locale === "ru"
                ? "Информация о государственной приемке законченных строительством объектов телекоммуникации"
                : locale === "uzb"
                ? "Қурилиши тугалланган телекоммуникация қурилмаларини давлат томонидан қабул қилиш тўғрисида маълумот"
                : "Information on the state acceptance of completed construction of telecommunications facilities"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
