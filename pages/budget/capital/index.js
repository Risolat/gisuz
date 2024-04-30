import axios from "../../../http";
import { Montserrat } from "next/font/google";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../../next-i18next.config";
import dayjs from "dayjs";
import Sidebar from "@/components/Sidebar";
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const page = ({ capital }) => {
  return (
    <div>
      <div className="container">
        <div className="flex flex-row items-start py-[40px]">
          <div className="basis-3/4">
            <div>
              <h3
                className={`${montserrat.variable} max-w-[1000px] text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]`}
              >
                {capital.title}
              </h3>
              <p className="pb-3 text-[18px] text-[#A2A0B3]">
                {dayjs(capital.updated_at).format("DD.MM.YYYY")}
              </p>
              <div
                className="pr-[40px] desc-html leading-[38px] w-full text-[16px] text-[#A2A0B3] leading-[22px] text-justify font-inter break-words"
                dangerouslySetInnerHTML={{ __html: capital.description }}
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
  const locale = context.locale;
  const res = await axios(
    `/${locale}/api/menu/submenu/42ed35f4-2809-41b4-8ad8-452ac2b10a7a/posts/`
  );

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
      capital: res.data.results[0],
    },
  };
}
export default page;
