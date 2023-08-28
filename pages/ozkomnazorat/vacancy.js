import axios from "../../http";
import Link from "next/link";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../next-i18next.config";

const page = ({ title, submenu }) => {
  const { locale } = useRouter();

  return (
    <div>
      <div className="container">
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px]">
          <div className="2xl:basis-3/4 basis-full w-full pl-[20px] 2xl:pl-0 mb-[20px] mr-[30px]">
            <div>
              <h3 className="text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]">
                {locale === "uz"
                  ? "Vakansiyalar"
                  : locale === "ru"
                  ? "Вакансии"
                  : locale === "uzb"
                  ? "Вакансиялар"
                  : "Vacancies"}
              </h3>
              <p>
                {locale === "uz"
                  ? "Hozirda boʻsh ish oʻrinlari mavjud emas"
                  : locale === "ru"
                  ? "В настоящее время в организации нет открытых вакансий"
                  : locale === "uzb"
                  ? "Ҳозирда бўш иш ўринлари мавжуд эмас"
                  : "There are currently no open vacancies in the organization"}
              </p>
            </div>
          </div>
          <div className="ticky top-[197px] 2xl:w-[350px] w-full 2xl:basis-1/4 basis-full mx-[20px] 2xl:mx-0 py-[8px] bg-[#3A2F7D]">
            <p className="mb-[24px] text-[20px] px-[16px]">{title}</p>
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
