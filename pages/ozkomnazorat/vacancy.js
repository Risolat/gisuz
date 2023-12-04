import axios from "../../http";
import Link from "next/link";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../next-i18next.config";
import { Montserrat } from "next/font/google";
import Head from "next/head";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const page = ({ title, submenu }) => {
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
              <p className="pb-5">
                {locale === "uz"
                  ? "Hozirda boʻsh ish oʻrinlari mavjud emas"
                  : locale === "ru"
                  ? "В настоящее время в организации нет открытых вакансий"
                  : locale === "uzb"
                  ? "Ҳозирда бўш иш ўринлари мавжуд эмас"
                  : "There are currently no open vacancies in the organization"}
              </p>
              <div className="gradientBox">
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
            </div>
          </div>
          <div className="ticky top-[197px] 2xl:w-[350px] w-full 2xl:basis-1/4 basis-full mx-[20px] 2xl:mx-0 py-[8px] bg-[#3A2F7D]">
            <p
              className={`${montserrat.variable} font-semibold font-montserrat mb-[24px] text-[1.12rem] px-[16px]`}
            >
              {title}
            </p>
            <ul className="">
              {submenu.map((item) => (
                <li key={item.id} className="bg-[#3A2F7D]">
                  {item.slug === "/ozkomnazorat/vacancy" ? (
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

export async function getServerSideProps(context) {
  const locale = context.locale;
  const response = await axios.get(`/${locale}/api/menu/`);
  const menuName = ["OZCOM"];
  const menu = response.data.filter((category) =>
    menuName.includes(category.name)
  );
  const title = menu.map((d) => {
    return d.title;
  });

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
      title: title,
      submenu: menu[0].submenu,
    },
  };
}
export default page;
