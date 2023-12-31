import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import axios from "../../../../http";
import Link from "next/link";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../../../next-i18next.config";
import { Montserrat } from "next/font/google";
import Head from "next/head";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const reportsDetail = ({ title, submenu, images, reports, locale }) => {
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };

  return (
    <div className="mb-[150px]">
      <Head>
        <title>{reports.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px]">
          <div className="2xl:basis-3/4 basis-full w-full pl-[20px] 2xl:pl-0 mb-[20px]">
            <div>
              <h3
                className={`${montserrat.variable} text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]`}
              >
                {reports.title}
              </h3>
              <p className="text-[#A2A0B3] pb-[10px] desc-html text-[1em] leading-[22px] font-inter break-words">
                {reports.title}
              </p>
              <div className="flex">
                <LightGallery
                  // onInit={onInit}
                  className=""
                  speed={500}
                  plugins={[lgThumbnail, lgZoom]}
                >
                  {images.map((img, i) => (
                    <a href={img.image} key={i}>
                      <Image
                        width="300"
                        height="300"
                        src={img.image}
                        alt={img.title}
                        className="w-[342px] h-[200px] mb-[80px] mx-[5px] object-cover"
                      />
                    </a>
                  ))}
                </LightGallery>
              </div>
            </div>
          </div>
          <div className="sticky top-[197px] 2xl:w-[350px] w-full 2xl:basis-1/4 basis-full mx-[20px] 2xl:mx-0 py-[8px] bg-[#3A2F7D]">
            <p
              className={`${montserrat.variable} font-semibold font-montserrat mb-[24px] text-[1.12rem] px-[16px]`}
            >
              {title}
            </p>
            <ul className="">
              {submenu.map((item) => (
                <li key={item.id} className="bg-[#3A2F7D]">
                  <div className="gradientBox bg-[#3A2F7D]">
                    <Link
                      className="block py-[10px] px-[16px] hover:bg-[#24224E] hover:text-white bg-[#3A2F7D] text-[#A2A0B3]"
                      locale={locale}
                      href={`${
                        item.slug === "/activity/strategy" || item.slug == null
                          ? item.link
                          : item.slug
                      }`}
                      target={`${
                        item.slug === "/activity/strategy" || item.slug == null
                          ? "_blank"
                          : "_self"
                      }`}
                    >
                      {item.title}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export async function getServerSideProps(context) {
  console.log(context, "context");
  const locale = context.locale;
  const query = context.query.reportsId;
  const res = await axios(`/${locale}/api/activity/${query}`);
  const data = await res.data;
  const response = await axios.get(`/${locale}/api/menu/`);

  const menuName = ["ACTIVITY"];

  const menu = response.data.filter((category) =>
    menuName.includes(category.name)
  );

  const title = menu.map((d) => {
    return d.title;
  });
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
      reports: data,
      images: data.images,
      title: title,
      submenu: menu[0].submenu,
      locale: locale,
    },
  };
}
export default reportsDetail;
