import React, { useEffect } from "react";
import axios from "../http";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const appealCode = () => {
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
      code_request: "",
      code_password: "",
      captcha_is_correct: "",
    },
  });

  const [testCode, setTestCode] = useState("");
  const [randomText, setRandomText] = useState("");
  const [captcha_is_correct, setcaptcha_is_correct] = useState(false);
  const [code_request, setcode_request] = useState("");
  const [code_password, setcode_password] = useState("");
  const [check, setCheck] = useState([]);
  const [Isopen, setIsopen] = useState(false);
  const [date, setdate] = useState("");
  const [time, settime] = useState("");

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

      const response = await axios.post(
        `/${locale}/api/appeals/check/`,
        formData
      );
      const check = response.data;
      setCheck(check);
      const date = response.data.created_at.slice(0, 10);
      const time = response.data.created_at.slice(11, 16);
      settime(time);
      setdate(date);
      console.log(date);
      console.log(response.data.created_at);
      setIsopen(true);
    } else {
      setError("captcha_is_correct", {
        message: "is incorect",
      });
    }
  };
  function handleCodeRequest(event) {
    setcode_request(event.target.value);
    setValue("code_request", event.target.value);
  }
  function handleCodePassword(event) {
    setcode_password(event.target.value);
    setValue("code_password", event.target.value);
  }
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
    <div>
      {Isopen ? (
        <div id="alert">
          <div className=" w-full mb-[20px]" id="alertContent">
            <div className="relative bg-[#3A2F7D] p-[35px]  mr-[20px] font-montserrat">
              <p className="my-[12px] font-montserrat text-[1.37rem] font-bold text-[#a2a0b3]">
                {t("modal.your-appeal")}
              </p>
              <div className="w-full flex flex-col items-start ">
                <div className="w-full flex justify-between py-[12px] font-medium text-[1.12rem] border-[#a2a0b3] border-[1px]">
                  <p className="text-[#a2a0b3] px-[12px]">
                    {t("modal.appeal-sent-data")}
                  </p>
                  <p className="px-[12px]">
                    {dayjs(date).format("DD.MM.YYYY")} {time}
                  </p>
                </div>
                <div className="w-full flex justify-between py-[12px] font-medium text-[1.12rem] border-[#a2a0b3] border-[1px]">
                  <p className="text-[#a2a0b3] px-[12px]">
                    {t("modal.from-who")}
                  </p>
                  <p className="px-[12px]">{check.full_name}</p>
                </div>
                <div className="w-full flex justify-between py-[12px] font-medium text-[1.12rem] border-[#a2a0b3] border-[1px]">
                  <p className="text-[#a2a0b3] px-[12px]">
                    {t("modal.appeal-text")}
                  </p>
                  <p className="px-[12px]">{check.text}</p>
                </div>
                <div className="w-full flex justify-between py-[12px] font-medium text-[1.12rem] border-[#a2a0b3] border-[1px]">
                  <p className="text-[#a2a0b3] px-[12px]">
                    {t("modal.appeal-answer")}
                  </p>
                  <p className="px-[12px]">{check.answer_text}</p>
                </div>
                <div className="w-full flex justify-between py-[12px] font-medium text-[1.12rem] border-[#a2a0b3] border-[1px]">
                  <p className="text-[#a2a0b3] px-[12px]">
                    {t("modal.appeal-status")}
                  </p>
                  <p className="px-[12px]">{check.status}</p>
                </div>
                <div className="w-full flex justify-between py-[12px] font-medium text-[1.12rem] border-[#a2a0b3] border-[1px]">
                  <p className="text-[#a2a0b3] px-[12px]">{t("form.email")}</p>
                  <p className="px-[12px]">{check.email}</p>
                </div>
                <div className="w-full flex justify-between py-[12px] font-medium text-[1.12rem] border-[#a2a0b3] border-[1px]">
                  <p className="text-[#a2a0b3] px-[12px]">{t("form.phone")}</p>
                  <p className="px-[12px]">{check.phone}</p>
                </div>
                <div className="w-full flex justify-between py-[12px] font-medium text-[1.12rem] border-[#a2a0b3] border-[1px]">
                  <p className="text-[#a2a0b3] px-[12px]">
                    {t("form.address")}
                  </p>
                  <p className="px-[12px]">{check.address}</p>
                </div>
                <div className="w-full flex justify-between py-[12px] font-medium text-[1.12rem] border-[#a2a0b3] border-[1px]">
                  <p className="text-[#a2a0b3] px-[12px]">Tuman</p>
                  <p className="px-[12px]">{check.district}</p>
                </div>
                <div className="w-full flex justify-between py-[12px] font-medium text-[1.12rem] border-[#a2a0b3] border-[1px]">
                  <p className="text-[#a2a0b3] px-[12px]">
                    {t("modal.appeal-file")}
                  </p>
                  <Link href={`${check.file}`} className="px-[12px]">
                    <Icon
                      icon="fa6-solid:file-pdf"
                      color="#a2a0b3"
                      width="52"
                      height="52"
                    />
                  </Link>
                </div>
                <div className="w-full flex justify-between py-[12px] font-medium text-[1.12rem] border-[#a2a0b3] border-[1px]">
                  <p className="text-[#a2a0b3] px-[12px]">
                    {t("modal.attachment-file")}
                  </p>
                  <Link href={`${check.attachment_file}`} className="px-[12px]">
                    <Icon
                      icon="material-symbols:do-not-disturb-on"
                      color="#a2a0b3"
                      width="52"
                      height="52"
                    />
                  </Link>
                </div>
              </div>
              <Icon
                className="absolute right-[10px] top-[10px]"
                icon="mdi:clear-circle-outline"
                color="#a2a0b3"
                width="25"
                height="25"
                onClick={() => setIsopen(false)}
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className=" pb-[40px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="flex flex-col mb-[20px]">
            <p className="text-[18px] pb-[10px]">{t("modal.appeal-code")}</p>
            <input
              type="text"
              name="code_request"
              onChange={(event) => handleCodeRequest(event)}
              className="w-[280px] md:w-[500px] border-slate-200 placeholder-slate-400 px-[8px] py-[10px] bg-[#3A2F7D] contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
              {...register("code_request", { required: true })}
            />
            <span className="error-message">
              {errors.code_request?.type === "required" &&
                t("validator.field-required")}
            </span>
          </label>
          <label className="flex flex-col mb-[20px]">
            <p className="text-[18px] pb-[10px]">
              {t("modal.appeal-check-code")}
            </p>
            <input
              type="text"
              name="code_password"
              onChange={(event) => handleCodePassword(event)}
              className="w-[280px] md:w-[500px] border-slate-200 placeholder-slate-400 px-[8px] py-[10px] bg-[#3A2F7D] contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
              {...register("code_password", { required: true })}
            />
            <span className="error-message">
              {errors.code_password?.type === "required" &&
                t("validator.field-required")}
            </span>
          </label>
          <div className="flex flex-col items-center justify-center lg:items-start">
            <div className="flex items-start justify-center">
              <div className="flex">
                <label className="flex">
                  <input
                    type="text"
                    onChange={(event) => handleCapcha(event)}
                    name="captcha_is_correct"
                    className="border-slate-200 placeholder-slate-400 px-[8px] py-[10px] w-[180px] md:w-[370px] bg-[#3A2F7D] contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
                    {...register("captcha_is_correct", {
                      required: true,
                    })}
                  />

                  <span className="px-[8px] py-[10px] border-l bg-[#3A2F7D] text-[17px]">
                    {randomText}
                  </span>

                  <span className="text-[red]">
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
            <span className="error-message">
              {t("validator.field-required")}
            </span>
          </div>
          <button
            type="submit"
            //   onClick={() => getnetwork()}
            className="px-[60px] py-[20px] mt-[30px] border hover:bg-white hover:text-[#3C3971]"
          >
            {t("button.check")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default appealCode;
