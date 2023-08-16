import axios from "../../http";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
// import "./survey.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../next-i18next.config";

const MySwal = withReactContent(Swal);

import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const page = () => {
  const { t } = useTranslation("index");
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
    console.log(data);
    const response = await axios.post(`/${locale}/api/survey/answer/`, data);
    console.log(response);
    if (response.status === 201) {
      MySwal.fire({
        title: t("modal.thanks-for-participating-survey"),
        timer: 5500,
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
        timer: 5500,
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
  const [title, setTitle] = useState();
  const [submenu, setSubmenu] = useState([]);
  const [survey, setsurvey] = useState([]);
  const [aboutsurvey, setaboutsurvey] = useState([]);
  const [form_data, setFormData] = useState({});

  const getData = async () => {
    const response = await axios.get(`/${locale}/api/menu/`);

    const menuName = ["INTERACTIVE_SERVICES"];

    const data = response.data.filter((category) =>
      menuName.includes(category.name)
    );
    const title = data.map((d) => {
      return d.title;
    });
    setTitle(title);
    setSubmenu(data[0].submenu);
  };

  // const setAnswer = (questionId, answerId, answerText) => {
  //   form_data[questionId] = { text: answerText, id: answerId };
  //   console.log(form_data);
  // };

  const getsurvey = async () => {
    const response = await axios.get(
      `/${locale}/api/survey/surveyBySubmenuSlug/?submenu_slug=/interactive_service/survey`
    );
    const survey = response.data.survey[0].questions;
    const aboutsurvey = response.data.about_survey;
    setaboutsurvey(aboutsurvey);

    console.log(survey, "DATA");
    setsurvey(survey);
  };

  useEffect(() => {
    getData();
    getsurvey();
    // MySwal.fire({
    //   title: t("modal.thanks-for-participating-survey"),
    //   timer: 5500,
    //   icon: "success",
    //   color: "#A2A0B3",
    //   background: "#3A2F7D",
    //   timerProgressBar: true,
    //   timer: 5500,
    //   showConfirmButton: false,
    //   customClass: {
    //     timerProgressBar: "swal_timerProgressBar",
    //     popup: "swal_popup",
    //   },
    //   didOpen: (toast) => {
    //     toast.addEventListener("mouseenter", Swal.stopTimer);
    //     toast.addEventListener("mouseleave", Swal.resumeTimer);
    //   },
    // });
  }, []);

  return (
    <div>
      <div className="container">
        <div className="flex flex-row items-start py-[40px]">
          <div className="basis-3/4 mr-[30px]">
            <div className="pb-[20px]">
              <h3 className="text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]">
                {aboutsurvey.title}
              </h3>
              <p className="pr-[40px] desc-html leading-[38px] w-full text-[16px] text-[#A2A0B3] leading-[22px] text-justify font-inter break-words">
                {aboutsurvey.description}
              </p>
            </div>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                {survey.map((item, index) => (
                  <div className="questions" key={index}>
                    <div className="flex items-start pb-[10px]">
                      <span className="pr-[5px]">{item.number}</span>
                      <span className="text-[1.12em] text-white font-medium font-montserrat leading-[25px]">
                        {item.title}
                      </span>
                    </div>
                    {item.type === RADIO_INPUT ? (
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
                                />
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : item.type === TEXT_INPUT ? (
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
                        />
                      </div>
                    ) : item.type === TEXT_AND_RADIO ? (
                      <div className="block pb-[10px]">
                        {!form_data[item.id]?.id && (
                          <div className="flex">
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
                            />
                          </div>
                        )}
                        {item.options.map((opt, index) => (
                          <>
                            <div className="flex mb-[10px]">
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
                                />
                              </div>
                            ) : (
                              <></>
                            )}
                          </>
                        ))}
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
          <div className="sticky top-[197px] w-[350px] basis-1/4 py-[8px] bg-[#3A2F7D]">
            <p className="mb-[24px] text-[20px] px-[16px]">{title}</p>
            <ul className="">
              {submenu.map((item) => (
                <li key={item.id} className="bg-[#3A2F7D]">
                  {item.slug === "/interactive_service/survey" ? (
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
