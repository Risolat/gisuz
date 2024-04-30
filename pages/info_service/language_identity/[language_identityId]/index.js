import axios from "../../../../http";
import Link from "next/link";
import Image from "next/image";
import date_range from "../../../../public/photos/main/date_range.svg";
import red_eye from "../../../../public/photos/main/red_eye.svg";
import dayjs from "dayjs";
import { Icon } from "@iconify/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../../../next-i18next.config";
import Head from "next/head";
import Sidebar from "@/components/Sidebar";
const wisdomDetail = ({ wisdom, view, photos, locale, query }) => {
  return (
    <div>
      <Head>
        <title>{wisdom.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px]">
          <div className="2xl:basis-3/4 basis-full w-full pl-[20px] 2xl:pl-0 mb-[20px] pr-[20px]">
            <h3 className="text-white px-[10px] mt-[40px] description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]">
              {wisdom.title}
            </h3>
            <div className="flex items-center justify-between pr-[20px] pb-[10px]">
              <div className="flex items-center justify-self-end">
                <div className="flex items-center mr-[10px]">
                  <Image
                    className="mr-[5px]"
                    src={date_range}
                    alt={date_range}
                  />
                  <p className="text-[#a2a0b3]">
                    {dayjs(wisdom.date).format("DD.MM.YYYY")}
                  </p>
                </div>
                <div className="flex items-center">
                  <Image className="mr-[5px]" src={red_eye} alt="red eye" />
                  <p className="text-[#a2a0b3]">{view}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Link
                  target="_blank"
                  href={`${`https://www.facebook.com/sharer/sharer.php?u=${`http://newgis.technocorp.uz/${locale}/language_identity/info_service/${query}&text=${wisdom.title}`}`}`}
                >
                  <Icon
                    icon="ri:facebook-fill"
                    color="#a2a0b3"
                    width={30}
                    height={30}
                  />
                </Link>
                <Link
                  href={`${`http://telegram.me/share/url?url=http://newgis.technocorp.uz/${locale}/language_identity/info_service/${query}&text=${wisdom.title}`}`}
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
              <div className="w-full h-full">
                <img
                  className="2xl:w-[1056px] 2xl:h-[625px] w-full mr-[30px]"
                  src={photos}
                  width={1056}
                  height={625}
                />
              </div>
              <div>
                <p
                  className="pr-[40px] desc-html leading-[38px] text-[16px] text-[#A2A0B3] leading-[22px] text-justify font-inter break-words"
                  dangerouslySetInnerHTML={{ __html: wisdom.description }}
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
  const query = context.query.language_identityId;
  const res = await axios(`/${locale}/api/information_service/${query}`);
  const wisdom = await res.data;
  const view = await axios(
    `/${locale}/api/information_service/view_count/${query}`
  );
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
      wisdom: wisdom,
      view: view.data.num_views,
      photos: res.data.images[0].photo,
      query: context.query.language_identityId,
      locale: locale,
    },
  };
}
export default wisdomDetail;
