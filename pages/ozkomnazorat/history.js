import axios from "../../http";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../next-i18next.config";
import { Montserrat } from "next/font/google";
import Head from "next/head";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const History = ({ history, title, submenu, locale }) => {
  return (
    <div className="">
      <Head>
        <title>{history.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={history.title} />
        <meta property="og:title" content={history.title} key="title" />
        <meta name="title" content={history.title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gis.uz/ozkomnazorat/history" />
        <meta property="og:title" content="Oʻzkomnazorat" />
        <meta property="og:description" content={history.title} />
        <meta
          property="twitter:url"
          content="https://gis.uz/ozkomnazorat/history"
        />
        <meta property="twitter:title" content="`Oʻzkomnazorat" />
        <meta property="twitter:description" content={history.title} />
        <meta property="og:title" content={history.title} key="title" />
      </Head>
      <div className="container">
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px]">
          <div className="2xl:basis-3/4 basis-full w-full pl-[20px] mb-[20px]">
            <div>
              <h3
                className={`${montserrat.variable} text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]`}
              >
                {history.title}
              </h3>
              <div
                className="pr-4 desc-html leading-[38px] w-full text-[16px] text-[#A2A0B3] leading-[22px] text-justify font-inter break-words"
                dangerouslySetInnerHTML={{ __html: history.description }}
              />
            </div>
          </div>
          <div className="sticky top-[197px] 2xl:w-[350px] w-full 2xl:basis-1/4 basis-full mx-[20px] 2xl:mx-0  py-[8px] bg-[#3A2F7D]">
            <p
              className={`${montserrat.variable} font-montserrat font-semibold mb-[24px] text-[1.12rem] px-[16px]`}
            >
              {title}
            </p>
            <ul className="">
              {submenu.map((item) => (
                <li key={item.id} className="bg-[#3A2F7D]">
                  {item.slug === "/ozkomnazorat/history" ? (
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

// export async function getStaticProps({ locale }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(
//         locale,
//         ["common", "index", "navbar"],
//         i18nextConfig
//       )),
//     },
//   };
// }
export async function getServerSideProps(context) {
  console.log(context, "context");
  const locale = context.locale;
  const res = await axios(
    `/${locale}/api/about/aboutBySubmenuSlug/?submenu_slug=/ozkomnazorat/history`
  );
  const data = await res.data[0];
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
      history: data,
      title: title,
      submenu: menu[0].submenu,
      locale: locale,
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
    },
  };
}
export default History;
