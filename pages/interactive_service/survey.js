import axios from "../../http";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../next-i18next.config";
import Head from "next/head";

const MySwal = withReactContent(Swal);

import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Montserrat } from "next/font/google";
import dayjs from "dayjs";
import Sidebar from "@/components/Sidebar";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const page = () => {
  const { t } = useTranslation("common");
  const { locale } = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async () => {
    let data = Object.entries(form_data);
    data = data.map(([key, val], i) => {
      let returenedObj = {
        question: key,
      };
      if (val.text && val.id) {
        returenedObj["answer_text"] = val.text;
        returenedObj["answer"] = val.id;
      } else if (val.text) {
        returenedObj["answer_text"] = val.text;
      } else {
        returenedObj["answer"] = val.id;
      }
      return returenedObj;
    });
    const response = await axios.post(`/${locale}/api/survey/answer/`, data);
    if (response.status === 201) {
      MySwal.fire({
        title: t("modal.thanks-for-participating-survey"),
        icon: "success",
        color: "#A2A0B3",
        background: "#3A2F7D",
        timerProgressBar: true,
        timer: 5500,
        showConfirmButton: false,
        customClass: {
          timerProgressBar: "swal_timerProgressBar",
          popup: "swal_popup",
        },
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
    } else {
      MySwal.fire({
        title: t("modal.survey-not-answered"),
        icon: "error",
        color: "#A2A0B3",
        background: "#3A2F7D",
        timerProgressBar: true,
        timer: 5500,
        showConfirmButton: false,
        customClass: {
          timerProgressBar: "swal_timerProgressBar",
          popup: "swal_popup",
        },
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
    }
  };
  const [BUTTON, RADIO_INPUT, TEXT_INPUT, TEXT_AND_RADIO] = [
    "Кнопка",
    "Кнопка переключения",
    "Текст",
    "Кнопка переключения и текст",
  ];
  const [survey, setsurvey] = useState([]);
  const [aboutsurvey, setaboutsurvey] = useState([]);
  const [form_data, setFormData] = useState({});

  const getsurvey = async () => {
    const response = await axios.get(
      `/${locale}/api/survey/surveyBySubmenuSlug/?submenu_slug=/interactive_service/survey`
    );
    const survey = response.data.survey[0].questions;
    const aboutsurvey = response.data.about_survey;
    setaboutsurvey(aboutsurvey);
    setsurvey(survey);
  };

  useEffect(() => {
    getsurvey();
  }, []);

  return (
    <div>
      <Head>
        <title>{aboutsurvey.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px]">
          <div className="2xl:basis-3/4 basis-full w-full pl-[20px] 2xl:pl-0 mb-[20px] pr-[20px] px-[20px]">
            <div className="pb-[20px]">
              <h3
                className={`${montserrat.variable} text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]`}
              >
                {aboutsurvey.title}
              </h3>
              <p className="pb-4 text-[18px] text-[#A2A0B3]">
                {dayjs(aboutsurvey.updated_at).format("DD.MM.YYYY")}
              </p>
              <p className="pr-[40px] desc-html leading-[38px] w-full text-[16px] text-[#A2A0B3] leading-[22px] text-justify font-inter break-words">
                {aboutsurvey.description}
              </p>
            </div>
            <div>
              <form onSubmit={handleSubmit(onSubmit)} name="myForm">
                {survey.map((item, index) => (
                  <div className="questions" key={index}>
                    <div className="flex items-start pb-[10px]">
                      <span className="pr-[5px]">{item.number}</span>
                      <span className="text-[1.12em] text-white font-medium font-montserrat leading-[25px]">
                        {item.title}
                      </span>
                    </div>

                    {item.type === RADIO_INPUT ? (
                      <div>
                        <div className="block pb-[10px]">
                          {item.options.map((opt, index) => (
                            <div key={opt.id}>
                              <div className="flex mb-[10px]">
                                <input
                                  className="cursor-pointer w-[20px] h-[20px]"
                                  type="radio"
                                  id={"id-" + opt.id}
                                  value={opt.id}
                                  name={"answer-" + item.id}
                                  checked={form_data[item.id]?.id === opt.id}
                                  onChange={(e) =>
                                    setFormData({
                                      ...form_data,
                                      [item.id]: { id: e.target.value },
                                    })
                                  }
                                  required
                                />
                                <label
                                  className="font-inter text-[1.12em] leading-[24px] text-text_secondary cursor-pointer pl-[10px] text-[#A2A0B3]"
                                  htmlFor={"id-" + opt.id}
                                >
                                  {opt.title}
                                </label>
                              </div>
                              {opt.with_input &&
                              form_data[item.id]?.id === opt.id ? (
                                <div key={opt.id}>
                                  <div className="flex">
                                    <input
                                      className="base_input w-full mb-[10px]"
                                      type="text"
                                      id={"id-" + opt.id}
                                      name={"answer-" + item.id}
                                      value={form_data[item.id]?.text}
                                      placeholder={t("form.write-answer")}
                                      onChange={(e) =>
                                        setFormData({
                                          ...form_data,
                                          [item.id]: {
                                            ...form_data[item.id],
                                            text: e.target.value,
                                          },
                                        })
                                      }
                                      required
                                    />
                                  </div>
                                  {/* <span className="error-message block mb-[20px]">
                                    {t("validator.field-required")}
                                  </span> */}
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          ))}
                        </div>
                        {/* <span className="error-message block mb-[20px]">
                          {t("validator.field-required")}
                        </span> */}
                      </div>
                    ) : item.type === TEXT_INPUT ? (
                      <div>
                        <div className="flex">
                          <input
                            className="base_input w-full mb-[10px]"
                            type="text"
                            id={"id-" + item.id}
                            name={"answer-" + item.id}
                            placeholder={t("form.write-answer")}
                            onChange={(e) =>
                              setFormData({
                                ...form_data,
                                [item.id]: {
                                  text: e.target.value,
                                },
                              })
                            }
                            value={form_data[item.id]?.text}
                            required
                          />
                        </div>
                        {/* <span className="error-message block mb-[20px]">
                          {t("validator.field-required")}
                        </span> */}
                      </div>
                    ) : item.type === TEXT_AND_RADIO ? (
                      <div>
                        <div className="block pb-[10px]">
                          {!form_data[item.id]?.id && (
                            <div className="flex" key={item.id}>
                              <input
                                className="base_input w-full mb-[10px]"
                                type="text"
                                id={"id-" + item.id}
                                name={"answer-" + item.id}
                                placeholder={t("form.write-answer")}
                                value={form_data[item.id]?.text}
                                onChange={(e) =>
                                  setFormData({
                                    ...form_data,
                                    [item.id]: {
                                      text: e.target.value,
                                    },
                                  })
                                }
                                required
                              />
                            </div>
                          )}
                          {item.options.map((opt, index) => (
                            <>
                              <div className="flex mb-[10px]" key={index}>
                                <input
                                  className="cursor-pointer w-[20px] h-[20px]"
                                  key={opt.id}
                                  type="radio"
                                  id={"id-" + opt.id}
                                  value={opt.id}
                                  name={"answer-" + item.id}
                                  checked={form_data[item.id]?.id === opt.id}
                                  onChange={(e) =>
                                    setFormData({
                                      ...form_data,
                                      [item.id]: {
                                        id: e.target.value,
                                      },
                                    })
                                  }
                                  required
                                />
                                <label
                                  className="font-inter text-[1.12em] leading-[24px] text-text_secondary cursor-pointer pl-[10px] text-[#A2A0B3]"
                                  htmlFor={"id-" + opt.id}
                                >
                                  {opt.title}
                                </label>
                              </div>
                              {opt.with_input &&
                              form_data[item.id]?.id === opt.id ? (
                                <div className="flex" key={opt.id}>
                                  <input
                                    className="base_input w-full mb-[10px]"
                                    type="text"
                                    id={"id-" + opt.id}
                                    name={"answer-" + item.id}
                                    value={form_data[item.id]?.text}
                                    placeholder={t("form.write-answer")}
                                    onChange={(e) =>
                                      setFormData({
                                        ...form_data,
                                        [item.id]: {
                                          ...form_data[item.id],
                                          text: e.target.value,
                                        },
                                      })
                                    }
                                    required
                                  />
                                </div>
                              ) : (
                                <></>
                              )}
                            </>
                          ))}
                        </div>
                        {/* <span className="error-message block mb-[20px]">
                          {t("validator.field-required")}
                        </span> */}
                      </div>
                    ) : (
                      <button></button>
                    )}
                  </div>
                ))}
                <div className="flex mt-[40px]">
                  <button
                    className="px-[30px] py-[12px] border border-white font-inter font-medium text-[1em] hover:bg-white text-white hover:text-[#171142]"
                    type="submit"
                  >
                    {t("button.send")}
                  </button>
                </div>
              </form>
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
