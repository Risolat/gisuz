import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../next-i18next.config";
import Link from "next/link";
import Image from "next/image";
import logoGis from "../../public/photos/icons/logo-gis.svg";
import logo from "../../public/photos/icons/logo.svg";
import Footer from "../../components/Footer";
import Head from "next/head";
import axios from "../../http";

export async function getServerSideProps(context) {
  console.log(context, "context");
  const locale = context.locale;
  const res = await axios.get(`${locale}/api/menu/`);
  const data = await res.data;
  console.log(data);
  return {
    props: {
      menu: data,
      locale,
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
    },
  };
}

const Sitemap = ({ menu, locale }) => {
  const { t } = useTranslation("common");
  return (
    <>
      <div>
        <div className="absolute z-20 top-0 w-full bg-[#171142]">
          <div className="border-[#5C587A] border-b-[2px]">
            <div className="container py-[30px]">
              <div className="flex justify-between items-start">
                <Link href="/" className="relative flex items-center">
                  <Image src={logoGis} alt="logo-gis" className="pr-[16px]" />
                  <Image src={logo} alt="logo" />
                  <div className="pl-[16px]">
                    <h1 className="title-gradient text-[24px] leading-8 font-bold">
                      {t("navbar.ozcom")}
                    </h1>
                    <p className="max-w-[284px] title-gradient text-[14px] font-normal leading-4">
                      {t("navbar.ozcom-full")}
                    </p>
                  </div>
                </Link>
                <Link href="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    className="text-text_secondary iconify iconify--ep"
                    width="32px"
                    height="32px"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 1024 1024"
                  >
                    <path
                      fill="currentColor"
                      d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504L738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512L828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496L285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512L195.2 285.696a64 64 0 0 1 0-90.496z"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="flex justify-between flex-wrap py-[30px]">
              {menu.map((d) => (
                <ul key={d.id}>
                  <li>
                    <p className="pb-[30px] text-white text-[16px] xl:text-[1.5em] font-roboto font-bold w-[250px]">
                      {d.title}
                    </p>
                    {d?.length === 0 ? (
                      <div>Loading...</div>
                    ) : (
                      d?.submenu.map((sub) => (
                        <ul className="w-[300px]" key={sub.id}>
                          <li>
                            <Link
                              // onClick={() => setmenuOpen(false)}
                              className="block pb-[10px] text-[1.12em] font-montserrat text-[#A2A0B3] hover:text-white cursor-pointer  font-semibold"
                              locale={locale}
                              href={`${
                                sub.slug === "/activity/strategy" ||
                                sub.slug == null
                                  ? sub.link
                                  : sub.slug
                              }`}
                            >
                              {sub.title}
                            </Link>
                          </li>
                        </ul>
                      ))
                    )}
                  </li>
                </ul>
              ))}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Sitemap;
