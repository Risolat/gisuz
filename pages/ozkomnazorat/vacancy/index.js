import axios from "../../../http";
import Link from "next/link";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../../next-i18next.config";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import Sidebar from "@/components/Sidebar";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const page = ({ vacancy }) => {
  const { locale } = useRouter();
  return (
    <div>
      <Head>
        <title>
          {locale === "uz"
            ? "Vakansiyalar"
            : locale === "ru"
            ? "Вакансии"
            : locale === "uzb"
            ? "Вакансиялар"
            : "Vacancies"}
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px]">
          <div className="2xl:basis-3/4 basis-full w-full pl-[30px] mb-[20px] mr-[30px]">
            <div>
              <h3
                className={`${montserrat.variable} text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]`}
              >
                {locale === "uz"
                  ? "Vakansiyalar"
                  : locale === "ru"
                  ? "Вакансии"
                  : locale === "uzb"
                  ? "Вакансиялар"
                  : "Vacancies"}
              </h3>
              {/* <p className="pb-5">
                {locale === "uz"
                  ? "Hozirda boʻsh ish oʻrinlari mavjud emas"
                  : locale === "ru"
                  ? "В настоящее время в организации нет открытых вакансий"
                  : locale === "uzb"
                  ? "Ҳозирда бўш иш ўринлари мавжуд эмас"
                  : "There are currently no open vacancies in the organization"}
              </p> */}
              <div className="gradientBox mb-[50px]">
                <div className="bg-color border-[#3A2F7D] border-y-[2px] hover:bg-[#24224E] w-full">
                  <p className="text-[1.12rem]  py-[16px] px-[8px]">
                    <Link
                      href="https://vacancy.argos.uz/vacancies/vacancy-list?organization=17593"
                      className="text-[#A2A0B3]"
                      target="_blank"
                    >
                      {locale === "uz"
                        ? "Davlat fuqarolik xizmatchilari vakant lavozimlarining yagona ochiq portali"
                        : locale === "ru"
                        ? "Единственный открытый портал вакансий государственных госслужащих"
                        : locale === "uzb"
                        ? "Ҳозирда бўш иш ўринлари мавжуд эмас"
                        : "The only open portal of government civil servants vacancies"}
                    </Link>
                  </p>
                </div>
              </div>

              {vacancy.map((item) => (
                <div className="gradientBox">
                  <div className="bg-color border-[#3A2F7D] border-y-[2px] hover:bg-[#24224E] w-full">
                    <p className="text-[1.12rem]  py-[16px] px-[8px]">
                      <Link
                        href={`/ozkomnazorat/vacancy/${item.id}`}
                        className="text-[#A2A0B3]"
                      >
                        {item.title}
                      </Link>
                    </p>
                  </div>
                </div>
              ))}
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
  const res = await axios(`/${locale}/api/employee/vacancy/vacancy/`);
  const data = await res.data.results;

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
      vacancy: data,
    },
  };
}
export default page;
