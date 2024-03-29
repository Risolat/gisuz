import axios from "../../../http";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../../next-i18next.config";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import dayjs from "dayjs";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const page = ({ execution, title, submenu, locale }) => {
  return (
    <div className="">
      <Head>
        <title>{execution[0].sub_menu}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={execution[0].sub_menu} />
        <meta property="og:title" content={execution[0].sub_menu} key="title" />
        <meta name="title" content={execution[0].sub_menu} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://gis.uz/activity/execution-of-programs"
        />
        <meta property="og:title" content="Oʻzkomnazorat" />
        <meta property="og:description" content={execution[0].sub_menu} />
        <meta
          property="twitter:url"
          content="https://gis.uz/activity/execution-of-programs"
        />
        <meta
          property="twitter:title"
          content={`Oʻzkomnazorat - ${execution[0].sub_menu}`}
        />
        <meta property="twitter:description" content={execution[0].sub_menu} />
        <meta property="og:title" content={execution[0].sub_menu} key="title" />
      </Head>

      <div className="container">
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px] mb-[100px]">
          <div className="2xl:basis-3/4 basis-full w-full pl-[20px]">
            <h3
              className={`${montserrat.variable} text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]`}
            >
              {execution[0].sub_menu}
            </h3>
            <div className="flex flex-col mt-[20px] pr-[16px]">
              {execution.map((r) => (
                <div key={r.id} className="gradientBox">
                  <div className="bg-color border-[#3A2F7D] border-y-[2px] hover:bg-[#24224E] w-full">
                    <p className="text-[1.12rem]  py-[16px] px-[8px]">
                      <Link
                        className="text-[#A2A0B3]"
                        href={`/activity/execution-of-programs/${r.id}`}
                      >
                        {r.title}
                      </Link>
                    </p>
                    <p className="flex items-end justify-end p-3 text-[18px] text-[#A2A0B3]">{dayjs(r.updated_at).format("DD.MM.YYYY")}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="sticky top-[197px] mt-[80px] 2xl:w-[350px] w-full 2xl:basis-1/4 basis-full mx-[20px] 2xl:mx-0 py-[8px] bg-[#3A2F7D]">
            <p
              className={`${montserrat.variable} font-semibold font-montserrat mb-[24px] text-[1.12rem] px-[16px]`}
            >
              {title}
            </p>
            <ul className="">
              {submenu.map((item) => (
                <li key={item.id} className="bg-[#3A2F7D]">
                  {item.slug === "/activity/execution-of-programs" ? (
                    <div className="gradientBox  bg-[#3A2F7D]">
                      <Link
                        className="block py-[10px] px-[16px] mx-[3px] hover:bg-[#24224E] bg-[#171142] text-white"
                        href={`${
                          item.slug === "/activity/strategy" ||
                          item.slug == null
                            ? item.link
                            : item.slug
                        }`}
                        target={`${
                          item.slug === "/activity/strategy" ||
                          item.slug == null
                            ? "_blank"
                            : "_self"
                        }`}
                      >
                        {item.title}
                      </Link>
                    </div>
                  ) : (
                    <div className="gradientBox bg-[#3A2F7D]">
                      <Link
                        className="block py-[10px] px-[16px] hover:bg-[#24224E] hover:text-white bg-[#3A2F7D] text-[#A2A0B3]"
                        locale={locale}
                        href={`${
                          item.slug === "/activity/strategy" ||
                          item.slug == null
                            ? item.link
                            : item.slug
                        }`}
                        target={`${
                          item.slug === "/activity/strategy" ||
                          item.slug == null
                            ? "_blank"
                            : "_self"
                        }`}
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
  console.log(context, "context");
  const locale = context.locale;
  const res = await axios(
    `/${locale}/api/activity/activityPostBySubmenuSlug/?submenu_slug=/activity/execution`
  );
  const data = await res.data.results;
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
export default page;
