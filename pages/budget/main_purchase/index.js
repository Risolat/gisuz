import axios from "../../../http";
import { Montserrat } from "next/font/google";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../../next-i18next.config";
import Sidebar from "@/components/Sidebar";
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const page = ({ main_purchase }) => {
  return (
    <div>
      <div className="container">
        <div className="flex flex-row items-start py-[40px]">
          <div className="basis-3/4">
            <div>
              <h3
                className={`${montserrat.variable} max-w-[1000px] text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]`}
              >
                {main_purchase.title}
              </h3>
              <div
                className="pr-[40px] desc-html leading-[38px] w-full text-[16px] text-[#A2A0B3] leading-[22px] text-justify font-inter break-words"
                dangerouslySetInnerHTML={{ __html: main_purchase.description }}
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
    `/${locale}/api/menu/submenu/43ed4b12-2129-4fd9-bdb0-faf506ee7cb4`
  );
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
      main_purchase: res.data,
    },
  };
}
export default page;
