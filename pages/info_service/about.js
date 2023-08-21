import axios from "../../http";
import Link from "next/link";
import Image from "next/image";
import axbUser from "../../public/photos/main/axb.jpeg";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../next-i18next.config";
import { useTranslation } from "next-i18next";
const page = ({ about, title, submenu, locale }) => {
  const { t } = useTranslation("common");
  return (
    <div>
      <div className="container">
        <div className="flex flex-row items-start py-[40px]">
          <div className="basis-3/4">
            <div className="px-[16px]">
              <h3 className="text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]">
                {about.title}
              </h3>
              <Image
                src={axbUser}
                alt="image"
                width={400}
                height={600}
                className="mb-[20px]"
              />

              <div className="text-[16px] text-[#A2A0B3] leading-[22px">
                <p className="pb-[10px] font-bold text-[18px]">
                  Masharipova Ruxsora Olimjonovna
                </p>
                <p className="pb-[10px]">
                  <b>
                    <span>{t("card.address")}: </span>
                  </b>
                  <span>{t("navbar.address")}</span>
                </p>
                <p className="pb-[10px]">
                  <b>
                    <span>{t("card.phone")}: </span>
                  </b>
                  <span>+99871-202-6992, +99871-202-6974</span>
                </p>
                <p className="pb-[10px]">
                  <b>
                    <span>{t("card.email")}: </span>
                  </b>
                  <span>press@gis.uz</span>
                </p>
              </div>
            </div>
          </div>
          <div className="sticky top-[197px] w-[350px] basis-1/4 py-[8px] bg-[#3A2F7D]">
            <p className="mb-[24px] text-[20px] px-[16px]">{title}</p>
            <ul className="">
              {submenu.map((item) => (
                <li key={item.id} className="bg-[#3A2F7D]">
                  {item.slug === "/info_service/about" ? (
                    <div className="gradientBox  bg-[#3A2F7D]">
                      <Link
                        className="block py-[10px] px-[16px] mx-[3px] hover:bg-[#24224E] bg-[#171142] text-white"
                        href={`${item.slug}`}
                      >
                        {item.title}
                      </Link>
                    </div>
                  ) : (
                    <div className="gradientBox bg-[#3A2F7D]">
                      <Link
                        className="block py-[10px] px-[16px] hover:bg-[#24224E] hover:text-white bg-[#3A2F7D] text-[#A2A0B3]"
                        locale={locale}
                        href={`${item.slug}`}
                      >
                        {item.title}
                      </Link>
                    </div>
                  )}
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
  const res = await axios(
    `/${locale}/api/information_service/additionalInfoBySlug/?submenu_slug=/info_service/about`
  );
  const data = await res.data.results[0];

  const response = await axios.get(`/${locale}/api/menu/`);
  const menuName = ["INFORMATION_SERVICE"];
  const menu = response.data.filter((category) =>
    menuName.includes(category.name)
  );
  const title = menu.map((d) => {
    return d.title;
  });
  console.log(data);
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
      about: data,
      title: title,
      submenu: menu[0].submenu,
      locale: locale,
    },
  };
}
export default page;
