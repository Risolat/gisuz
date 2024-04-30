import axios from "../../http";
import Link from "next/link";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../next-i18next.config";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import Sidebar from "@/components/Sidebar";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const page = ({ org_str }) => {
  return (
    <div>
      <Head>
        <title>{org_str.sub_menu}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px]">
          <div className="2xl:basis-3/4 basis-full w-full pl-[20px] mb-[20px]">
            <h3
              className={`${montserrat.variable} text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]`}
            >
              {org_str.sub_menu}
            </h3>
            <div className="pr-3 flex justify-center">
              <Image
                src={org_str.photo}
                alt={org_str}
                width="1000"
                height="800"
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
  const res = await axios(
    `/${locale}/api/about/structure/organizationalStructureBySubmenuSlug/?submenu_slug=/ozkomnazorat/organization_structure`
  );
  const data = await res.data[0];

  return {
    props: {
      org_str: data,
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
    },
  };
}
export default page;
