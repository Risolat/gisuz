import axios from "../../../../http";
import Link from "next/link";
import Image from "next/image";
import date_range from "../../../../public/photos/main/date_range.svg";
import red_eye from "../../../../public/photos/main/red_eye.svg";
import dayjs from "dayjs";
import { Icon } from "@iconify/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../../../next-i18next.config";

const wisdomDetail = ({ wisdom, title, submenu, photos, locale, query }) => {
  return (
    <div>
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
                  <p className="text-[#a2a0b3]">{wisdom.view_count}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Link
                  target="_blank"
                  href={`${`https://www.facebook.com/sharer/sharer.php?u=${`http://newgis.technocorp.uz/${locale}/language_nation/info_service/${query}&text=${wisdom.title}`}`}`}
                >
                  <Icon
                    icon="ri:facebook-fill"
                    color="#a2a0b3"
                    width={30}
                    height={30}
                  />
                </Link>
                <Link
                  href={`${`http://telegram.me/share/url?url=http://newgis.technocorp.uz/${locale}/language_nation/info_service/${query}&text=${wisdom.title}`}`}
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
          <div className="sticky top-[160px] 2xl:w-[350px] w-full 2xl:basis-1/4 basis-full mx-[20px] 2xl:mx-0 py-[8px] bg-[#3A2F7D]">
            <p className="mb-[24px] text-[20px] px-[16px]">{title}</p>
            <ul className="">
              {submenu.map((item) => (
                <li key={item.id} className="bg-[#3A2F7D]">
                  <div className="gradientBox bg-[#3A2F7D]">
                    <Link
                      className="block py-[10px] px-[16px] hover:bg-[#24224E] hover:text-white bg-[#3A2F7D] text-[#A2A0B3]"
                      locale={locale}
                      href={`${item.slug}`}
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
  const locale = context.locale;
  const query = context.query.language_nationId;
  const res = await axios(`/${locale}/api/information_service/${query}`);
  const wisdom = await res.data;

  const response = await axios.get(`/${locale}/api/menu/`);
  const menuName = ["INFORMATION_SERVICE"];
  const menu = response.data.filter((category) =>
    menuName.includes(category.name)
  );
  const title = menu.map((d) => {
    return d.title;
  });
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
      wisdom: wisdom,
      photos: res.data.images[0].photo,
      query: context.query.language_nationId,
      title: title,
      submenu: menu[0].submenu,
      locale: locale,
    },
  };
}
export default wisdomDetail;
