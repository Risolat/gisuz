import axios from "../../http";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../next-i18next.config";
import { useTranslation } from "next-i18next";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const page = ({ leaders }) => {
  console.log(leaders);
  const { t } = useTranslation("common");
  return (
    <div>
      <Head>
        <title>{leaders[0].sub_menu}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={leaders[0].sub_menu} />
        <meta property="og:title" content={leaders[0].sub_menu} key="title" />
        <meta name="title" content={leaders[0].sub_menu} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gis.uz/ozkomnazorat/leaders" />
        <meta property="og:title" content="Oʻzkomnazorat" />
        <meta property="og:description" content={leaders[0].sub_menu} />
        <meta
          property="twitter:url"
          content="https://gis.uz/ozkomnazorat/leaders"
        />
        <meta property="twitter:title" content="`Oʻzkomnazorat" />
        <meta property="twitter:description" content={leaders[0].sub_menu} />
        <meta property="og:title" content={leaders[0].sub_menu} key="title" />
      </Head>
      <div className="container">
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px]">
          <div className="2xl:basis-3/4 basis-full w-full pl-[30px] mb-[20px] mr-[30px]">
            <h3
              className={`${montserrat.variable} text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]`}
            >
              {leaders[0].sub_menu}
            </h3>
            {leaders.map((l) => (
              <div className="gradientBox mb-[30px]" key={l.id}>
                <div className="w-full flex flex-col md:flex-row items-center justify-center md:justify-start xl:items-start p-[24px] bg-[#3A2F7D] hover:bg-[#312E6B]">
                  <div className="w-full flex justify-center lg:justify-start md:w-[30%] lg:w-[20%] md:mr-5">
                    <div className="w-[180px] h-[250px] relative">
                      <Image
                        quality={100}
                        src={l.photo}
                        alt="photo"
                        blurDataURL={l.thumbnail}
                        fill
                        placeholder="blur"
                        sizes="100%"
                        loading="lazy"
                        className="object-cover object-center"
                      />
                    </div>
                  </div>
                  <div className="w-full flex flex-col justify-center items-center md:justify-senter md:items-start">
                    <div className="w-full">
                      <p className="text-white text-center md:text-left font-montserrat font-medium text-[1.12em] mb-[8px] mt-[10px]">
                        {l.position}
                      </p>
                      <p className="font-semibold text-center text-[#A2A0B3] md:text-left font-inter text-[1.25em] h-[60px] xl:h-[110px] text-text_secondary">
                        {l.last_name} {l.first_name} {l.father_name}
                      </p>
                    </div>
                    <div className="flex flex-col xl:flex-row w-full border-[#5C587A] border-t-[2px] pt-3 lg:pt-[30px]">
                      <div className="flex items-center mr-[30px] mb-[10px]">
                        <Icon
                          className="text-white mr-[5px]"
                          height="34px"
                          icon="carbon:phone-filled"
                          width="34px"
                        />
                        <div>
                          <p className="font-medium text-[0.8125em] text-[#A2A0B3] mb-[4px]">
                            {t("form.phone")}
                          </p>
                          <p className="text-[1em] text-white">{l.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center mr-[30px] mb-[10px]">
                        <Icon
                          className="text-white mr-[5px]"
                          height="34px"
                          icon="cib:mail-ru"
                          width="34px"
                        />
                        <div>
                          <p className="font-medium text-[0.8125em] text-[#A2A0B3] mb-[4px]">
                            {t("form.email")}
                          </p>
                          <p className="text-[1em] text-white">{l.mail}</p>
                        </div>
                      </div>
                      <div className="flex items-center mr-[30px] mb-[10px]">
                        <Icon
                          className="text-white mr-[5px]"
                          height="34px"
                          icon="fa-solid:calendar-alt"
                          width="34px"
                        />
                        <div>
                          <p className="font-medium text-[0.8125em] text-[#A2A0B3] mb-[4px]">
                            {t("card.receive-time")}
                          </p>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: l.working_time,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
    `/${locale}/api/employee/employeeBySlug/?submenu_slug=/ozkomnazorat/leaders`
  );
  const data = await res.data.results;

  return {
    props: {
      leaders: data,
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
    },
  };
}
export default page;
