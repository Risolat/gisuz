import axios from "../../http";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../next-i18next.config";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const page = ({ questions, title, submenu, locale }) => {
  return (
    <div>
      <div className="container">
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px]">
          <div className="2xl:basis-3/4 basis-full w-full pl-[20px] 2xl:pl-0 mb-[20px] pr-[20px]">
            <div className="px-[16px]">
              <h3
                className={`${montserrat.variable} font-montserrat font-semibold text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]`}
              >
                {locale === "ru"
                  ? "Часто задаваемые вопросы"
                  : locale === "en"
                  ? "FAQ"
                  : questions[0].sub_menu}
              </h3>
              <div
                className="pr-[40px] desc-html leading-[38px] w-divl text-[16px] text-[#A2A0B3] leading-[22px] text-justify font-inter break-words"
                dangerouslySetInnerHTML={{
                  __html:
                    locale === "ru"
                      ? ""
                      : locale === "en"
                      ? ""
                      : questions[0].description,
                }}
              />
            </div>
          </div>
          <div className="sticky top-[160px] 2xl:w-[350px] w-full 2xl:basis-1/4 basis-full mx-[20px] 2xl:mx-0 py-[8px] bg-[#3A2F7D]">
            <p
              className={` ${montserrat.variable} font-montserrat font-semibold mb-[24px] text-[20px] px-[16px]`}
            >
              {title}
            </p>
            <ul className="">
              {submenu.map((item) => (
                <li key={item.id} className="bg-[#3A2F7D]">
                  {item.slug === "/info_service/frequently-asked-questions" ? (
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
  const res = await axios(
    `/${locale}/api/information_service/informationServiceBySlug/?submenu_slug=/info_service/frequently-asked-questions`
  );
  const response = await axios.get(`/${locale}/api/menu/`);
  const menuName = ["INFORMATION_SERVICE"];
  const menu = response.data.filter((category) =>
    menuName.includes(category.name)
  );
  const title = menu.map((d) => {
    return d.title;
  });
  console.log(res.data.results, "questions");
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
      questions: res.data.results,
      title: title,
      submenu: menu[0].submenu,
      locale: locale,
    },
  };
}
export default page;
