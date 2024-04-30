import axios from "../../../../http";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../../../next-i18next.config";
import Head from "next/head";
import Sidebar from "@/components/Sidebar";

const seminarDataDetail = ({ seminar_data }) => {
  return (
    <div>
      <Head>
        <title>{seminar_data.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px]">
          <div className="2xl:basis-3/4 basis-full w-full pl-[20px] 2xl:pl-0 mb-[20px] pr-[20px]">
            <div>
              <h3 className="text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px] mr-[20px]">
                {seminar_data.title}
              </h3>
              <div
                className="pr-[40px] desc-html leading-[38px] w-full text-[16px] text-[#A2A0B3] leading-[22px] text-justify font-inter break-words"
                dangerouslySetInnerHTML={{ __html: seminar_data.description }}
              />
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
  const query = context.query.seminar_dataId;
  const res = await axios(
    `/${locale}/api/information_service/additional_info/${query}`
  );
  const data = await res.data;

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
      seminar_data: data,
    },
  };
}
export default seminarDataDetail;
