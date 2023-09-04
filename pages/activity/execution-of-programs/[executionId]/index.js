import axios from "../../../../http";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../../../next-i18next.config";
import { useTranslation } from "next-i18next";
import { Montserrat } from "next/font/google";
import Head from "next/head";
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const executionDetail = ({ execution, title, submenu, locale }) => {
  const { t } = useTranslation("common");
  return (
    <div className="mb-[130px]">
      <Head>
        <title>{execution.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px]">
          <div className="2xl:basis-3/4 basis-full w-full pl-[20px] 2xl:pl-0 mb-[20px]">
            <div>
              <h3
                className={`${montserrat.variable} text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]`}
              >
                {execution.title}
              </h3>
              <div
                className="pr-[40px] desc-html leading-[38px] w-full text-[16px] text-[#A2A0B3] leading-[22px] text-justify font-inter break-words"
                dangerouslySetInnerHTML={{ __html: execution.description }}
              />
              <a
                href={execution.file}
                className="inline-block mt-[20px] hover:bg-white hover:text-[#171142] font-bold tracking-[1px] text-white border border-text_secondary px-[20px] py-[12px]"
                target="_blank"
                download
              >
                {t("button.download-document")}
              </a>
              <div className="flex item-center"></div>
            </div>
          </div>
          <div className="sticky top-[197px] 2xl:w-[350px] w-full 2xl:basis-1/4 basis-full mx-[20px] 2xl:mx-0 py-[8px] bg-[#3A2F7D]">
            <p
              className={`${montserrat.variable} font-semibold font-montserrat mb-[24px] text-[1.12rem] px-[16px]`}
            >
              {title}
            </p>
            <ul className="">
              {submenu.map((item) => (
                <li key={item.id} className="bg-[#3A2F7D]">
                  <div className="gradientBox bg-[#3A2F7D]">
                    <Link
                      className="block py-[10px] px-[16px] hover:bg-[#24224E] hover:text-white bg-[#3A2F7D] text-[#A2A0B3]"
                      locale={locale}
                      href={`${
                        item.slug === "/activity/strategy" || item.slug == null
                          ? item.link
                          : item.slug
                      }`}
                      target={`${
                        item.slug === "/activity/strategy" || item.slug == null
                          ? "_blank"
                          : "_self"
                      }`}
                    >
                      {item.title}
                    </Link>
                  </div>
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
  console.log(context, "context");
  const locale = context.locale;
  const query = context.query.executionId;
  const res = await axios(`/${locale}/api/activity/${query}`);
  const data = await res.data;
  const response = await axios.get(`/${locale}/api/menu/`);

  const menuName = ["ACTIVITY"];
  const menu = response.data.filter((category) =>
    menuName.includes(category.name)
  );
  const title = menu.map((d) => {
    return d.title;
  });
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
      execution: data,
      title: title,
      submenu: menu[0].submenu,
      locale: locale,
    },
  };
}

export default executionDetail;
