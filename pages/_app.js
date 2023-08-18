import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import "@/styles/globals.css";
import { appWithTranslation, useTranslation } from "next-i18next";
import { Inter, Montserrat } from "next/font/google";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import CTRL from "../components/ctrl";
import Connect from "../components/Connect";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata = {
  icons: { icon: "/public/favicon-32x32.png" },
  apple: "/public/favicon-32x32.png",
};
const App = ({ Component, pageProps }) => {
  const { t } = useTranslation("common");
  const { locale } = useRouter();
  return (
    <div className={`${inter.variable} font-inter`}>
      <Head>
        <title>{t("head_title")}</title>
        <meta name="description" content={t("navbar.ozcom-full")} />
        <meta
          property="og:title"
          content={t("navbar.ozcom-full")}
          key="title"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/public/apple-touch-icon.png"
        />
        <link rel="icon" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" sizes="32x32" href="/favicon.ico" />
        <link rel="icon" href="/public/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/public/favicon-16x16.png"
        />
        <link rel="manifest" href="/public/site.webmanifest" />
        <script src="//code.jivo.ru/widget/uP3hSgxG8p" async></script>
      </Head>
      <Navbar />
      <Connect />
      <CTRL />
      <Component
        className={`${montserrat.variable} font-montserrat`}
        {...pageProps}
      />
      <Footer />
    </div>
  );
};
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "index", "navbar"])),
    },
  };
}
export default appWithTranslation(App);
