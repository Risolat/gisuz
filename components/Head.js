import React from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../next-i18next.config";

const Head = () => {
  return (
    <head lang="uz">
      <title>{t("navbar.ozcom-short")}</title>
      <meta name="description" content={t("navbar.ozcom-full")} />
      <meta property="og:title" content={t("navbar.ozcom-full")} key="title" />
      <link rel="icon" href="../public/photos/gerb.svg" />
      <script src="//code.jivo.ru/widget/uP3hSgxG8p" async></script>
    </head>
  );
};
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
    },
  };
}
export default Head;
