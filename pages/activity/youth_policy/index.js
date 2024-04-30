import axios from "../../../http";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../../next-i18next.config";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import dayjs from "dayjs";
import Sidebar from "@/components/Sidebar";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const page = ({ youth }) => {
  return (
    <div className="mb-[100px]">
      <Head>
        <title>{youth[0].sub_menu}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={youth[0].sub_menu} />
        <meta property="og:title" content={youth[0].sub_menu} key="title" />
        <meta name="title" content={youth[0].sub_menu} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://gis.uz/activity/youth_policy"
        />
        <meta property="og:title" content="Oʻzkomnazorat" />
        <meta property="og:description" content={youth[0].sub_menu} />
        <meta
          property="twitter:url"
          content="https://gis.uz/activity/youth_policy"
        />
        <meta property="twitter:title" content={`Oʻzkomnazorat`} />
        <meta property="twitter:description" content={youth[0].sub_menu} />
        <meta property="og:title" content={youth[0].sub_menu} key="title" />
      </Head>
      <div className="container">
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px]">
          <div className="2xl:basis-3/4 basis-full w-full pl-[20px] 2xl:pl-0 mb-[20px]">
            <h3
              className={`${montserrat.variable} text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]`}
            >
              {youth[0].sub_menu}
            </h3>
            <div className="flex flex-col mt-[20px] pr-[16px]">
              {youth.map((r) => (
                <div key={r.id} className="gradientBox">
                  <div className="bg-color border-[#3A2F7D] border-y-[2px] hover:bg-[#24224E] w-full">
                    <p className="text-[1.12rem]  py-[16px] px-[8px]">
                      <Link
                        className="text-[#A2A0B3]"
                        href={`/activity/youth_policy/${r.id}`}
                      >
                        {r.title}
                      </Link>
                    </p>
                    <p className="flex items-end justify-end p-3 text-[18px] text-[#A2A0B3]">
                      {dayjs(r.updated_at).format("DD.MM.YYYY")}
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
  console.log(context, "context");
  const locale = context.locale;
  const res = await axios(
    `/${locale}/api/activity/activityPostBySubmenuSlug/?submenu_slug=/activity/youth_policy`
  );
  const data = await res.data.results;
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
      youth: data,
    },
  };
}
export default page;
