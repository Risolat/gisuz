import { Inter, Montserrat } from "next/font/google";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../next-i18next.config";
import CallCenter from "../components/CallCenter";
import Video from "@/components/Video";
import News from "@/components/News";
import Interactive from "@/components/Interactive";
import Statistics from "@/components/Statistics";
import MapOfUzbekistan from "@/components/MapOfUzbekistan";
import Partners from "@/components/Partners";
import axios from "axios";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export async function getServerSideProps(context) {
  console.log(context, "context");
  const locale = context.locale;
  const res = await axios(
    `https://back.gis.uz/${locale}/api/information_service/newsForHomePage/?submenu_slug=/info_service/news`
  );
  const data = await res.data;
  console.log(data);
  return {
    props: {
      news: data,
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
    },
  };
}

const Home = ({ news }) => {
  const { t } = useTranslation("index");
  return (
    <main className={`${montserrat.variable} font-monserrat`}>
      <div className={`${inter.variable} font-inter`}>
        <CallCenter />
        <Video />
        <News news={news} />
        <Interactive />
        <Statistics />
        <MapOfUzbekistan />
        <Partners />
      </div>
    </main>
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

export default Home;
