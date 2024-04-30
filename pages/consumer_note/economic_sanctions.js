import axios from "../../http";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../next-i18next.config";
import Sidebar from "@/components/Sidebar";
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const page = () => {
  return (
    <div>
      <div className="container">
        <div className="flex flex-row items-start py-[40px]">
          <div className="basis-3/4"></div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const locale = context.locale;
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
    },
  };
}
export default page;
