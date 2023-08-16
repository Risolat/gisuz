import axios from "../../http";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../next-i18next.config";

const page = ({ leaders, title, submenu }) => {
  const { locale } = useRouter();

  return (
    <div>
      <div className="container">
        <div className="flex flex-row items-start pt-[40px] pb-[100px]">
          <div className="basis-3/4 mr-[30px]">
            <h3 className="text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]">
              {leaders[0].sub_menu}
            </h3>
            {leaders.map((l) => (
              <div className="gradientBox mb-[30px]" key={l.id}>
                <div className="flex p-[24px] bg-[#3A2F7D] hover:bg-[#312E6B]">
                  <div className="basis-1/5">
                    <div className="mr-[24px] w-[full] h-[full]">
                      <img
                        className="w-[236px] h-[250px] object-cover object-top"
                        src={l.photo}
                        alt="photo"
                        width={236}
                        height={250}
                      />
                    </div>
                  </div>
                  <div className="basis-4/5 flex flex-col">
                    <div className="basis-6/12">
                      <p className="text-white text-center xl:text-left font-montserrat font-medium text-[1.12em] mb-[8px]">
                        {l.position}
                      </p>
                      <p className="font-semibold text-center text-[#A2A0B3] xl:text-left font-inter text-[1.25em] h-[90px] max-h-[90px] text-text_secondary">
                        {l.last_name} {l.first_name} {l.father_name}
                      </p>
                    </div>
                    <div className="flex basis-6/12 border-[#5C587A] border-t-[2px]">
                      <div className="flex items-center mr-[30px]">
                        <Icon
                          className="text-white mr-[5px]"
                          height="34px"
                          icon="carbon:phone-filled"
                          width="34px"
                        />
                        <div>
                          <p className="font-medium text-[0.8125em] text-[#A2A0B3] mb-[4px]">
                            Telefon
                          </p>
                          <p className="text-[1em] text-white">{l.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center mr-[30px]">
                        <Icon
                          className="text-white mr-[5px]"
                          height="34px"
                          icon="cib:mail-ru"
                          width="34px"
                        />
                        <div>
                          <p className="font-medium text-[0.8125em] text-[#A2A0B3] mb-[4px]">
                            Elektron pochta
                          </p>
                          <p className="text-[1em] text-white">{l.mail}</p>
                        </div>
                      </div>
                      <div className="flex items-center mr-[30px]">
                        <Icon
                          className="text-white mr-[5px]"
                          height="34px"
                          icon="fa-solid:calendar-alt"
                          width="34px"
                        />
                        <div>
                          <p className="font-medium text-[0.8125em] text-[#A2A0B3] mb-[4px]">
                            Qabul kunlari
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
          <div className="sticky top-[197px] w-[350px] basis-1/4 py-[8px] bg-[#3A2F7D]">
            <p className="mb-[24px] text-[20px] px-[16px]">{title}</p>
            <ul className="">
              {submenu.map((item) => (
                <li key={item.id} className="bg-[#3A2F7D]">
                  {item.slug === "/ozkomnazorat/controls" ? (
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
  console.log(context, "context");
  const locale = context.locale;
  const res = await axios(
    `/${locale}/api/employee/employeeBySlug/?submenu_slug=/ozkomnazorat/controls`
  );
  const data = await res.data.results;

  const response = await axios.get(`/${locale}/api/menu/`);
  const menuName = ["OZCOM"];
  const menu = response.data.filter((category) =>
    menuName.includes(category.name)
  );
  const title = menu.map((d) => {
    return d.title;
  });

  return {
    props: {
      leaders: data,
      title: title,
      submenu: menu[0].submenu,
      ...(await serverSideTranslations(locale, ["common"], i18nextConfig)),
      leaders: data,
    },
  };
}
export default page;
