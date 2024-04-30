import axios from "../../../http";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../../next-i18next.config";
import { useEffect } from "react";
import Sidebar from "@/components/Sidebar";
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const page = ({ info, locale }) => {
  return (
    <div>
      <div className="container">
        <div className="flex flex-row items-start py-[40px]">
          <div className="basis-3/4">
            <div>
              <h3
                className={`${montserrat.variable} max-w-[1000px] text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]`}
              >
                {info.title}
              </h3>
              <div className="pr-[40px] desc-html leading-[38px] w-full text-[16px] text-[#A2A0B3] leading-[22px] text-justify font-inter break-words" />
              <p className="text-[#A2A0B3]">
                {locale === "uz"
                  ? "O'zkomnazorat inspeksiyasi tassarufida budjet tashkilotlari mavjud emas"
                  : locale === "ru"
                  ? "Составе инспекции Узкомназорат нет подведомственных бюджетных организаций"
                  : locale === "uzb"
                  ? "Ўзкомназорат инспекцияси тассаруфида буджет ташкилотлари мавжуд эмас"
                  : "Incpection Uzkomnazorat does not include subordinate budgetary organizations"}
              </p>
            </div>
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const locale = context.locale;
  const res = await axios(
    `/${locale}/api/menu/submenu/a6f8e1b7-2463-4053-b53f-e8a7e4b8712f`
  );

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
      info: res.data,
      locale: locale,
    },
  };
}
export default page;
