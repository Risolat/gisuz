import axios from "../../../http";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../../next-i18next.config";
import { useEffect } from "react";
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const page = ({ capital, submenu, title, locale }) => {
  return (
    <div>
      <div className="container">
        <div className="flex flex-row items-start py-[40px]">
          <div className="basis-3/4 mb-[400px]">
            <div>
              <h3
                className={`${montserrat.variable} max-w-[1000px] text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]`}
              >
                {capital.title}
              </h3>
              <div
                className="pr-[40px] desc-html leading-[38px] w-full text-[16px] text-[#A2A0B3] leading-[22px] text-justify font-inter break-words"
                dangerouslySetInnerHTML={{ __html: capital.description }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const locale = context.locale;
  const res = await axios(
    `/${locale}/api/menu/submenu/42ed35f4-2809-41b4-8ad8-452ac2b10a7a/posts/`
  );

  const response = await axios.get(`/${locale}/api/menu/`);
  const menuName = ["Budjetijrosiochiqligi"];
  const menu = response.data.filter((category) =>
    menuName.includes(category.name)
  );
  const title = menu.map((d) => {
    return d.title;
  });
  console.log(res.data.results, "QWERTYUIOKHGFDSXCVBNMQWERTYUIOPQWERTYUIOP");
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
      capital: res.data.results[0],
      title: title,
      submenu: menu[0].submenu,
      locale: locale,
    },
  };
}
export default page;
