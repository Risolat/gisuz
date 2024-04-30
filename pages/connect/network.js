import axios from "../../http";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react";
import facebook from "../../public/photos/icons/facebook.svg";
import instagram from "../../public/photos/icons/instagram.svg";
import telegram from "../../public/photos/icons/telegram.svg";
import youtube from "../../public/photos/icons/youtube.svg";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../next-i18next.config";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import Sidebar from "@/components/Sidebar";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const page = () => {
  const { t } = useTranslation("index");
  const { locale } = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    setError,
  } = useForm({
    defaultValues: {
      full_name: "",
      phone: "",
      email: "",
      text: "",
      captcha_is_correct: "",
    },
  });
  const onSubmit = async (data) => {
    const isValid = data.captcha_is_correct === testCode;
    if (isValid) {
      const formData = new FormData();
      const fieldNames = Object.keys(data);

      fieldNames.forEach((item) => {
        if (item === "captcha_is_correct") {
          formData.append(item, "true");
        } else {
          formData.append(item, data[item]);
        }
      });

      const response = await axios.post(`/${locale}/api/contact/create_form/`, {
        formData,
        captcha_is_correct: true,
      });
    } else {
      setError("captcha_is_correct", {
        message: "is incorect",
      });
    }
  };
  const [randomText, setRandomText] = useState("");
  const [testCode, setTestCode] = useState("");

  function makeId() {
    let rText = "";

    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++)
      rText += possible.charAt(Math.floor(Math.random() * possible.length));
    const randomText = rText;
    setRandomText(randomText);
    setTestCode(rText);
    return rText;
  }

  useEffect(() => {
    makeId();
  }, []);

  return (
    <div className="">
      <Head>
        <title>{t("page-titles.connect.feedback")}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={t("page-titles.connect.feedback")} />
        <meta
          property="og:title"
          content={t("page-titles.connect.feedback")}
          key="title"
        />
        <meta name="title" content={t("page-titles.connect.feedback")} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gis.uz/connect/network" />
        <meta property="og:title" content="Oʻzkomnazorat" />
        <meta
          property="og:description"
          content={t("page-titles.connect.feedback")}
        />
        <meta property="twitter:url" content="https://gis.uz/connect/network" />
        <meta
          property="twitter:title"
          content={`Oʻzkomnazorat - ${t("page-titles.connect.feedback")}`}
        />
        <meta
          property="twitter:description"
          content={t("page-titles.connect.feedback")}
        />
        <meta
          property="og:title"
          content={t("page-titles.connect.feedback")}
          key="title"
        />
      </Head>
      <div className={`container`}>
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px]">
          <div
            className={`${montserrat.variable} font-montserrat 2xl:basis-3/4 basis-full w-full pl-[20px] 2xl:pl-0 mb-[20px] px-[20px]`}
          >
            <div className="pb-[50px]">
              <h3
                className={`${montserrat.variable} text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]`}
              >
                {t("page-titles.connect.feedback")}
              </h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col xl:flex-row items-center font-inter justify-between pb-[30px]">
                  <label className="w-full flex flex-col mb-[20px]">
                    <span className="block font-medium text-[20px] mb-[12px] leading-4">
                      {t("form.full-name")}
                    </span>
                    <input
                      type="text"
                      name="full_name"
                      className="border-slate-200 placeholder-slate-400 px-[8px] py-[10px] w-full xl:w-[300px] bg-[#3A2F7D] contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
                      {...register("full_name", { required: true })}
                    />
                    <span className="error-message">
                      {errors.full_name?.type === "required" &&
                        t("validator.field-required")}
                    </span>
                  </label>
                  <label className="flex flex-col w-full mb-[20px]">
                    <span className="block font-medium text-[20px] mb-[12px] leading-4">
                      {t("form.email")}
                    </span>
                    <input
                      type="email"
                      name="email"
                      className="border-slate-200 placeholder-slate-400 px-[8px] py-[10px] w-full xl:w-[300px] bg-[#3A2F7D] contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
                      {...register("email", {
                        required: true,
                        pattern:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      })}
                    />
                    <span className="error-message">
                      {errors.email?.type === "required" &&
                        t("validator.field-required")}
                      {errors.email?.type === "pattern" &&
                        "Entered email is in wrong format"}
                    </span>
                  </label>
                  <label className="flex flex-col w-full mb-[20px]">
                    <span className="block font-medium text-[20px] mb-[12px] leading-4">
                      {t("form.phone")}
                    </span>
                    <div className="flex items-center">
                      <span className="px-[8px] py-[10px] bg-[#3A2F7D] text-[17px]">
                        +998
                      </span>
                      <input
                        type="text"
                        name="phone"
                        placeholder=""
                        className="border-slate-200 placeholder-slate-400 px-[8px] py-[10px] w-full xl:w-[300px] bg-[#3A2F7D] contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
                        {...register("phone", { required: true })}
                      />
                    </div>
                    <span className="error-message">
                      {errors.phone?.type === "required" &&
                        t("validator.field-required")}
                    </span>
                  </label>
                </div>
                <div className="flex flex-col justify-start xl:flex-row xl:items-end mb-[30px]">
                  <label className="relative flex flex-col mr-[50px] w-full xl:w-auto">
                    <span className="block font-medium text-[20px] mb-[12px] leading-4">
                      {t("form.message-text")}
                    </span>
                    <input
                      type="text"
                      name="text"
                      placeholder=""
                      className="border-slate-200 placeholder-slate-400 px-[8px] py-[10px] w-full xl:w-[300px] bg-[#3A2F7D] contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
                      {...register("text", { required: true })}
                    />
                    <span className="absolute top-[74px] error-message">
                      {errors.text?.type === "required" &&
                        t("validator.field-required")}
                    </span>
                  </label>
                  <div>
                    <div className="flex items-center">
                      <div className="flex w-full">
                        <label className="flex w-full">
                          <input
                            type="text"
                            onChange={(event) => handleCapcha(event)}
                            name="captcha_is_correct"
                            className="border-slate-200 placeholder-slate-400 px-[8px] py-[8px] w-full xl:w-[200px] bg-[#3A2F7D] contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
                            {...register("captcha_is_correct", {
                              required: true,
                            })}
                          />

                          <span className="px-[8px] py-[5px] border-l bg-[#3A2F7D] text-center text-[17px]">
                            {randomText}
                          </span>

                          <span className="error-message">
                            {errors.captcha_is_correct
                              ? errors.captcha_is_correct.message
                              : ""}
                          </span>
                        </label>
                      </div>
                      <button type="button" onClick={() => makeId()}>
                        <Icon
                          icon="bx:refresh"
                          className="w-[50px] h-[50px] text-[#A2A0B3]"
                        />
                      </button>
                    </div>
                    <span className="absolute pl-[5px] error-message">
                      {t("validator.field-required")}
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-[60px] py-[20px] mt-[30px] border hover:bg-white hover:text-[#3C3971]"
                >
                  {t("button.send")}
                </button>
              </form>
            </div>
            <div>
              <h2 className="text-white font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]">
                {t("page-titles.connect.info-for-connect")}
              </h2>
              <div className="">
                <div className="flex justify-between flex-wrap font-inter">
                  <div>
                    <p className="text-[#A2A0B3] font-inter">
                      {" "}
                      {t("form.address")}
                    </p>
                    <p className="max-w-full xl:w-[300px] h-[85px] text-white-500">
                      {t("navbar.address")}
                    </p>

                    <p className="text-[#A2A0B3] font-inter">
                      {t("form.phone")}:{" "}
                    </p>
                    <p className="text-blue-500">(71) 202-69-65</p>
                    <p className="text-blue-500">(71) 202-69-61</p>
                  </div>
                  <div>
                    <p className="text-[#A2A0B3] font-inter">
                      {t("card.near-place")}:
                    </p>
                    <p className="h-[85px] xl:w-[300px]  text-white-500 ">
                      {locale === "uz"
                        ? "Ishchilar shaharchasi, Malika savdo markazi Avtobuslar: 29, 35, 97, 78, 148"
                        : locale === "ru"
                        ? "Рабочий городок, рынок Малика Автобусы: 29, 35, 78, 98, 148"
                        : locale === "uzb"
                        ? "Ишчилар шаҳарчаси, Малика савдо маркази Автобуслар: 29, 35, 97, 78, 148"
                        : "market Malika Bus: 29, 35, 78, 98, 148"}
                    </p>

                    <p className="text-[#A2A0B3] font-inter">
                      {t("form.email")}:
                    </p>
                    <p className="text-blue-500">info@gis.uz</p>
                    <p className="text-blue-500">gis@exat.uz</p>
                  </div>
                  <div>
                    <p className="text-[#A2A0B3] font-inter">
                      {t("card.work-time")}:
                    </p>
                    <p className="h-[85px] text-white-500">
                      {locale === "uz"
                        ? "Dushanba-juma; 9:00 dan 18:00 gacha"
                        : locale === "ru"
                        ? "С понедельника по пятницу; С 9:00 до 18:00"
                        : locale === "uzb"
                        ? "Душанба-жума; 9:00 дан 18:00 гача"
                        : "Monday to Friday; at 9:00 to 18:00"}
                    </p>
                    <p className="text-[#A2A0B3] font-inter">
                      {t("card.helpline")}:
                    </p>
                    <p className="text-blue-500">1144</p>
                  </div>
                </div>
                <ul className="flex items-center py-[30px]">
                  <li className="social-media-item pr-[15px]">
                    <Link
                      href="https://www.facebook.com/uzkomnazorat/"
                      target="_blank"
                      title="facebook"
                    >
                      <Image src={facebook} alt="facebook" />
                    </Link>
                  </li>
                  <li className="social-media-item pr-[15px]">
                    <Link
                      href="https://www.instagram.com/uzkomnazorat/"
                      target="_blank"
                    >
                      <Image src={instagram} alt="instagram" />
                    </Link>
                  </li>
                  <li className="social-media-item pr-[15px]">
                    <Link href="https://t.me/gisuz" target="_blank">
                      <Image src={telegram} alt="telegram" />
                    </Link>
                  </li>
                  <li className="social-media-item pr-[15px]">
                    <Link
                      href="https://www.youtube.com/channel/UC3ajfdl_uoWLGR1B-eCELWA"
                      target="_blank"
                    >
                      <Image src={youtube} alt="youtube" />
                    </Link>
                  </li>
                </ul>
                <div className="mt-[40px] w-full h-[50%]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.6108471547013!2d69.2691195!3d41.33907479999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b5ea58edc85%3A0x51140895946ac9fb!2z0I7Ql9Ca0J7QnNCd0JDQl9Ce0KDQkNCi!5e0!3m2!1sru!2s!4v1676867166891!5m2!1sru!2s"
                    width="100%"
                    height="500"
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ["common", "index", "navbar"],
        i18nextConfig
      )),
    },
  };
}
export default page;
