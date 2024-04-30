import axios from "../../http";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../next-i18next.config";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import dayjs from "dayjs";
import Sidebar from "@/components/Sidebar";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const page = ({ coordinate }) => {
  console.log(coordinate);
  return (
    <div>
      <Head>
        <title>{coordinate.length === 0 ? "" : coordinate[0].title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px]">
          <div className="2xl:basis-3/4 basis-full w-full pl-[30px] mb-[20px] mr-5">
            <div>
              <h3
                className={`${montserrat.variable} text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]`}
              >
                {coordinate.length === 0 ? "" : coordinate[0].title}
              </h3>
              <div
                className="pr-[10px] desc-html leading-[38px] w-full text-[16px] text-[#A2A0B3] leading-[22px] text-justify font-inter break-words"
                dangerouslySetInnerHTML={{
                  __html:
                    coordinate.length === 0 ? "" : coordinate[0].description,
                }}
              />
              <p className="flex items-end py-3 text-[18px] text-[#A2A0B3]">
                {dayjs(coordinate[0].date).format("DD.MM.YYYY")}
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
  console.log(context, "context");
  const locale = context.locale;
  const res = await axios(
    `/${locale}/api/information_service/informationServiceBySlug/?submenu_slug=/ozkomnazorat/coordinate`
  );
  const data = await res.data.results;
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
      coordinate: data,
    },
  };
}

export default page;
