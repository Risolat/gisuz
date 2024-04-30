import axios from "../../../../http";
import Link from "next/link";
import Image from "next/image";
import date_range from "../../../../public/photos/main/date_range.svg";
import red_eye from "../../../../public/photos/main/red_eye.svg";
import dayjs from "dayjs";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../../../next-i18next.config";
import { Icon } from "@iconify/react";
import Head from "next/head";
import Sidebar from "@/components/Sidebar";

const adsDetail = ({ ads, view, photos, locale, query }) => {
  return (
    <div>
      <Head>
        <title>{ads.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={ads.title} />
        <meta property="og:title" content={ads.title} key="title" />
        <meta name="title" content={ads.title} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://gis.uz/info_service/ads/${query}`}
        />
        <meta property="og:title" content="Oʻzkomnazorat" />
        <meta property="og:description" content={ads.title} />
        <meta
          property="twitter:url"
          content={`https://gis.uz/info_service/ads/${query}`}
        />
        <meta property="twitter:title" content={`Oʻzkomnazorat`} />
        <meta property="twitter:description" content={ads.title} />
        <meta property="og:title" content={ads.title} key="title" />
      </Head>
      <div className="container">
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px] pl-3">
          <div className="basis-3/4 mr-5">
            <h3 className="text-white mt-[40px] description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]">
              {ads.title}
            </h3>
            <div className="flex items-center justify-between pb-[20px]">
              <div className="flex items-center justify-self-end">
                <div className="flex items-center mr-[10px]">
                  <Icon icon="fa-solid:calendar-alt" color="#a2a0b3" />
                  <p className="pl-[2px] text-[#A2A0B3] font-inter">
                    {dayjs(ads.date).format("DD.MM.YYYY")}
                  </p>
                </div>
                <div className="flex items-center">
                  <Image className="mr-[5px]" src={red_eye} alt="red eye" />
                  <p className="text-[#A2A0B3] font-inter">{view}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Link
                  target="_blank"
                  href={`${`https://www.facebook.com/sharer/sharer.php?u=${`http://newgis.technocorp.uz/${locale}/ads/info_service/${query}&text=${ads.title}`}`}`}
                >
                  <Icon
                    icon="ri:facebook-fill"
                    color="#a2a0b3"
                    width={30}
                    height={30}
                  />
                </Link>
                <Link
                  href={`${`http://telegram.me/share/url?url=http://newgis.technocorp.uz/${locale}/ads/info_service/${query}&text=${ads.title}`}`}
                  className="mx-[10px]"
                  target="_blank"
                >
                  <Icon
                    icon="file-icons:telegram"
                    color="#a2a0b3"
                    width={28}
                    height={28}
                  />
                </Link>
              </div>
            </div>
            <div>
              {photos.map((p) => (
                <Image
                  src={p.photo}
                  alt="photo"
                  width={1050}
                  height={400}
                  className="h-[325px] xl:h-[625px] w-[1050px] w-full object-cover"
                />
              ))}
              <div>
                <p
                  className="mb-4 desc-html leading-[38px] text-[16px] text-[#A2A0B3] leading-[22px] text-justify font-inter break-words"
                  dangerouslySetInnerHTML={{ __html: ads.description }}
                />
                <div className="flex item-center"></div>
              </div>
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
  const query = context.query.adsId;
  const res = await axios(`/${locale}/api/information_service/${query}`);
  const ads = await res.data;

  const view = await axios(
    `/${locale}/api/information_service/view_count/${query}`
  );

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
      ads: ads,
      view: view.data.num_views,
      query: context.query.adsId,
      photos: res.data.images,
      locale: locale,
    },
  };
}
export default adsDetail;
