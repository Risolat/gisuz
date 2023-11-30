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
import ScrollTop from "@/components/ScrollTop";
import Script from "next/script";

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
        <meta name="title" content="Oʻzkomnazorat Inspeksiyasi" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gis.uz/uz/" />
        <meta property="og:title" content="Oʻzkomnazorat" />
        <meta
          property="og:description"
          content="Oʻzkomnazorat Inspeksiyasining rasmiy vebsayti"
        />
        <meta
          name="google-site-verification"
          content="dWBBDg8dUBa1unpF0_IzpVdnEVZgVfw3cKsxBfppCf0"
        />
        <meta property="twitter:url" content="https://gis.uz/uz/" />
        <meta property="twitter:title" content="Oʻzkomnazorat" />
        <meta property="twitter:description" content={t("navbar.ozcom-full")} />
        <meta property="og:title" content={t("navbar.ozcom")} key="title" />
        <link sizes="180x180" href="/apple-touch-icon.png"></link>
        <link type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
        <link type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>
        <link rel="manifest" href="/site.webmanifest"></link>
        <script src="//code.jivo.ru/widget/PYQoOFHYsy" async></script>
      </Head>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-HB2K8PGVLV"
      ></Script>
      <Script id="google-analytics">
        {`
         window.dataLayer = window.dataLayer || [];
         function gtag(){dataLayer.push(arguments);}
         gtag('js', new Date());
       
         gtag('config', 'G-HB2K8PGVLV');
         `}
      </Script>
      <Navbar />
      <Connect />
      <CTRL />
      <ScrollTop />
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
