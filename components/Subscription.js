import React from "react";
import axios from "../http";
import { useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Subscription = () => {
  const { t } = useTranslation("common");
  const { locale } = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    setError,
  } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (data) => {
    console.log(data);
    const response = await axios.post(
      `${locale}/api/distribution/subscribe/`,
      data
    );
    if (response.status === 201) {
      MySwal.fire({
        title: t("other.subscription-success"),
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
        title: t("other.subscription-error"),
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
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex">
        <div className="flex flex-col">
          <input
            className="outline-none bg-transparent mr-[2px] w-[240px] xl:w-[300px] placeholder:text-[0.89em] text-[1em] px-[12px] text-white focus:ring-offset-1 focus:ring-2 focus:ring-[#1D1A49] border border-[#3C3971] focus:z-[22] placeholder:text-[#A2A0B3] py-[10px]"
            type="email"
            name="email"
            placeholder={
              locale === "uz"
                ? "Sizning elektron pochta manzilingiz"
                : locale === "ru"
                ? "Ваша электронная почта"
                : locale === "uzb"
                ? "Сизнинг электрон почта манзилингиз"
                : "Your email"
            }
            {...register("email", {
              required: true,
              pattern:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            })}
          />
          <span className="error-message mt-2">
            {errors.email?.type === "required" && t("validator.field-required")}
            {errors.email?.type === "pattern" && t("validator.wrong-email")}
          </span>
        </div>

        <button className="px-[16px] py-[10px] mr-[25px] border border-[#3C3971] hover:bg-white hover:text-[#24224E]">
          {locale === "uz"
            ? "Obuna boʻlish"
            : locale === "ru"
            ? "Подписаться"
            : locale === "uzb"
            ? "Обуна бўлиш"
            : "Subscribe"}
        </button>
      </form>
    </div>
  );
};

export default Subscription;
