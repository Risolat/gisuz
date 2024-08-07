import axios from "../../http";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Image from "next/image";
import attach from "../../public/photos/icons/attach-file.svg";
import arrow from "../../public/photos/icons/arrow.svg";
import { Icon } from "@iconify/react";
import AppealCode from "../../components/appealCode.js";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
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
      region: "",
      district: "",
      full_name: "",
      address: "",
      phone: "",
      email: "",
      text: "",
      file: {},
      captcha_is_correct: "",
    },
  });

  const [testCode, setTestCode] = useState("");
  const [code_password, setcode_password] = useState("");
  const [code_request, setcode_request] = useState("");
  const [Isopen, setIsopen] = useState(false);

  const onSubmit = async (data) => {
    const isValid = data.captcha_is_correct === testCode;

    if (isValid) {
      const file = data.file[0];
      console.log(file, "file");
      if (file.type !== "application/pdf") {
        setError("selectedfile", {
          type: "filetype",
          message: "Only PDFs are valid.",
        });
        return;
      }

      const formData = new FormData();
      const fieldNames = Object.keys(data);

      fieldNames.forEach((item) => {
        if (item === "captcha_is_correct") {
          formData.append(item, "true");
        } else if (item === "file") {
          formData.append(item, data[item][0]);
        } else {
          formData.append(item, data[item]);
        }
      });

      const response = await axios.post(
        `/${locale}/api/appeals/create/`,
        formData
      );
      const code_password = response.data.code_password;
      setcode_password(code_password);
      const code_request = response.data.code_request;
      setcode_request(code_request);
      console.log(code_password, code_request);
      setIsopen(true);
      window.scrollTo(0, 0);
    } else {
      setError("captcha_is_correct", {
        message: "is incorect",
      });
    }
  };

  const [toggleState, setToggleState] = useState(1);
  const [regions, setregions] = useState([]);
  const [districtArr, setdistrictArr] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [regionId, setRegionId] = useState();
  const [districtName, setDistrictName] = useState("");
  const [district, setdistrict] = useState("");
  const [districtOpen, setDistrictOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [text, setText] = useState("");
  const [randomText, setRandomText] = useState("");
  const [captcha_is_correct, setcaptcha_is_correct] = useState(false);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  const getregions = async () => {
    const response = await axios.get(`${locale}/api/employee/region/regions/`);
    const regions = response.data.map((n) => {
      return { ...n, open: false };
    });
    setregions(regions);
  };
  function handleChange() {
    setValue("region", regionId);
  }
  const getDistrict = async (regionId, selected) => {
    setRegionId(regionId);
    setSelected(selected);
    setValue("region", regionId);
    setOpen(false);
    const response = await axios.get(
      `${locale}/api/employee/district/byRegionId/?region_id=${regionId}`
    );
    const districtArr = response.data.map((n) => {
      return { ...n, districtOpen: false };
    });

    setdistrictArr(districtArr);
  };
  const chooseDistrict = (district, districtName) => {
    setDistrictName(districtName);
    setdistrict(district);
    setValue("district", district);
    setDistrictOpen(!districtOpen);
  };
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
  function handleCapcha(event) {
    event.preventDefault();
    if (event.target.value === randomText) {
      setcaptcha_is_correct(!captcha_is_correct);
      setValue(!captcha_is_correct);
    } else {
      setcaptcha_is_correct(captcha_is_correct);
      setValue("captcha_is_correct", captcha_is_correct);
    }
    return captcha_is_correct;
  }
  useEffect(() => {
    getregions();
    makeId();
  }, []);

  return (
    <div>
      <Head>
        <title>Rasmiy murojaat, so‘rov yuborish</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Rasmiy murojaat, so‘rov yuborish" />
        <meta
          property="og:title"
          content="Rasmiy murojaat, so‘rov yuborish"
          key="title"
        />
        <meta name="title" content="Rasmiy murojaat, so‘rov yuborish" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gis.uz/connect/hotline" />
        <meta property="og:title" content="Oʻzkomnazorat" />
        <meta
          property="og:description"
          content="Rasmiy murojaat, so‘rov yuborish"
        />
        <meta property="twitter:url" content="https://gis.uz/connect/hotline" />
        <meta
          property="twitter:title"
          content="`Oʻzkomnazorat - Rasmiy murojaat, so‘rov yuborish"
        />
        <meta
          property="twitter:description"
          content="Rasmiy murojaat, so‘rov yuborish"
        />
        <meta
          property="og:title"
          content="Rasmiy murojaat, so‘rov yuborish"
          key="title"
        />
      </Head>
      <div className="container">
        <div className="flex flex-col 2xl:flex-row  2xl:items-start items-center py-[40px]">
          <div className="2xl:basis-3/4 basis-full w-full pl-[20px] 2xl:pl-0 mb-[20px] pr-[20px] px-[20px]">
            <div>
              <div className="block-tabs">
                <div
                  className={
                    toggleState === 1
                      ? "tabs active-tabs mr-[20px] "
                      : "tabs text-[#8F8F8F]"
                  }
                  onClick={() => toggleTab(1)}
                >
                  {t("form.interactive-service.send-appeal")}
                </div>
                <div
                  className={
                    toggleState === 2
                      ? "tabs active-tabs "
                      : "tabs text-[#8F8F8F]"
                  }
                  onClick={() => toggleTab(2)}
                >
                  {t("form.interactive-service.check-appeal")}
                </div>
              </div>

              <div className="content-tabs">
                {Isopen ? (
                  <div id="alert">
                    <div className=" w-full mb-[20px]" id="alertContent">
                      <div className="relative bg-[#164e21] text-green-500 p-[35px]  mr-[20px]">
                        <p>{t("modal.appeal-applied")}</p>
                        <div className="flex items-center">
                          <p>{t("modal.appeal-code")}:</p>{" "}
                          <span>{code_request}</span>
                          <p>{t("modal.appeal-check-code")}:</p>{" "}
                          <span>{code_password}</span>
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

                <div className={toggleState === 1 ? "block" : "hidden"}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mr-[30px] pb-[30px]">
                      <div className="flex flex-col xl:flex-row items-center justify-between pb-[40px]">
                        <div>
                          <p className="text-[18px] pb-[10px]">
                            {t("form.your-region")}
                          </p>
                          <label className="sr-only">
                            <input
                              type="text"
                              className="hidden"
                              id="region"
                              value={selected}
                              name="region"
                              onChange={() => handleChange()}
                            />
                          </label>

                          <div>
                            <div className="">
                              <div
                                onClick={() => setOpen(!open)}
                                className="bg-[#3A2F7D] flex justify-center cursor-pointer rounded"
                              >
                                <p className="w-[280px] md:w-[480px] h-[40px] px-[10px] pt-[8px]">
                                  {selected}
                                </p>
                                <Image src={arrow} alt="arrow" />
                              </div>
                              <ul
                                className={`${
                                  open
                                    ? "block absolute w-[500px] mt-3  pt-1 bg-[#3C3976] cursor-pointer z-10"
                                    : "hidden"
                                }`}
                              >
                                {regions.map((r) => (
                                  <li
                                    key={r.id}
                                    onClick={() => getDistrict(r.id, r.name)}
                                    className="px-[20px] py-[8px] text-[#A2A0B3] hover:bg-[#24224E] "
                                  >
                                    {r.name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-[18px] pb-[10px]">
                            {t("form.your-district")}
                          </p>
                          <label className="sr-only">
                            <input
                              type="text"
                              className="hidden"
                              id="district"
                              // value={district}
                              {...register("district")}
                              name="district"
                              onChange={(event) => handleDistrict(event)}
                            />
                          </label>

                          <div>
                            <div className="">
                              <div
                                onClick={() => setDistrictOpen(!districtOpen)}
                                className="bg-[#3A2F7D] flex justify-center cursor-pointer rounded"
                              >
                                <p className="w-[280px] md:w-[480px] h-[40px] px-[10px] pt-[8px]">
                                  {districtName}
                                </p>
                                <Image src={arrow} alt="arrow" />
                              </div>
                              <ul
                                className={`${
                                  districtOpen
                                    ? "block absolute w-[500px] mt-3  pt-1 bg-[#3C3976] cursor-pointer z-10"
                                    : "hidden"
                                }`}
                              >
                                {districtArr.map((r) => (
                                  <li
                                    key={r.id}
                                    onClick={() => chooseDistrict(r.id, r.name)}
                                    className="px-[20px] py-[8px] text-[#A2A0B3] hover:bg-[#24224E] "
                                  >
                                    {r.name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col xl:flex-row items-center justify-between pb-[40px]">
                        <label className="block">
                          <p className="text-[18px] pb-[10px]">
                            {t("form.full-name")}
                          </p>
                          <input
                            type="text"
                            name="full_name"
                            className="w-[280px] md:w-[500px] border-slate-200 placeholder-slate-400 px-[8px] py-[10px] bg-[#3A2F7D] contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
                            {...register("full_name", { required: true })}
                          />
                          <span className="error-message">
                            {errors.full_name?.type === "required" &&
                              t("validator.field-required")}
                          </span>
                        </label>
                        <label className="flex flex-col">
                          <p className="text-[18px] pb-[10px]">
                            {t("form.address")}
                          </p>
                          <input
                            type="text"
                            name="address"
                            className="w-[280px] md:w-[500px] border-slate-200 placeholder-slate-400 px-[8px] py-[10px] bg-[#3A2F7D] contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
                            {...register("address", { required: true })}
                          />
                          <span className="error-message">
                            {errors.address?.type === "required" &&
                              t("validator.field-required")}
                          </span>
                        </label>
                      </div>
                      <div className="flex flex-col xl:flex-row items-center justify-between pb-[40px]">
                        <div>
                          <p className="text-[18px] pb-[10px]">
                            {t("form.email")}
                          </p>
                          <label className="flex flex-col">
                            <input
                              type="email"
                              name="email"
                              className="border-slate-200 placeholder-slate-400 px-[8px] py-[10px] w-[280px] md:w-[500px] bg-[#3A2F7D] contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
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
                                t("validator.wrong-email")}
                            </span>
                          </label>
                        </div>
                        <div>
                          <label className="flex flex-col">
                            <p className="text-[18px] pb-[10px]">
                              {t("form.phone")}
                            </p>
                            <input
                              type="text"
                              name="phone"
                              placeholder=""
                              // value={phone}
                              onChange={() => setValue(phone)}
                              className="border-slate-200 placeholder-slate-400 px-[8px] py-[10px] w-[280px] md:w-[500px] bg-[#3A2F7D] contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
                              {...register("phone", { required: true })}
                            />
                            <span className="error-message">
                              {errors.phone?.type === "required" &&
                                t("validator.field-required")}
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="flex flex-col xl:flex-row xl:items-start items-center justify-between">
                        <div>
                          <p className="text-[18px] pb-[10px]">
                            {t("form.message-text")}
                          </p>
                          <label className="flex flex-col mr-0 xl:mr-[20px]">
                            <textarea
                              type="text"
                              name="text"
                              placeholder=""
                              onChange={() => setValue(text)}
                              className="border-slate-200 placeholder-slate-400 px-[8px] py-[10px] w-[280px] md:w-[500px] h-[180px] bg-[#3A2F7D] contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
                              {...register("text", { required: true })}
                            />
                            <span className="error-message">
                              {errors.text?.type === "required" &&
                                t("validator.field-required")}
                            </span>
                          </label>
                        </div>
                        <div>
                          <p className="text-[18px] pb-[10px]">
                            {t("form.file")}{" "}
                            <span className="text-[#A2A0B3]">
                              *{t("form.pdf-format")}
                            </span>
                          </p>

                          <div className="flex items-center justify-center w-full">
                            <label
                              htmlFor="dropzone-file"
                              className="flex items-center justify-between w-[280px] md:w-[500px] h-[70px] px-[10px]  cursor-pointer bg-[#3A2F7D]"
                            >
                              <p>{t("form.upload-file")}</p>
                              <div className="items-center justify-center rotate-45">
                                <Image
                                  src={attach}
                                  width={40}
                                  height={40}
                                  alt="image"
                                />
                              </div>
                              <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                name="file"
                                onChange={(e) => {
                                  setValue(e.target.files[0]);
                                  console.log(e);
                                }}
                                {...register("file", { required: true })}
                              />
                              {/* <span className="error-message">
                                {errors.file?.type === "required" &&
                                  "File is required"}
                              </span> */}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center lg:items-start justify-center">
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
                      <span className="error-message">
                        {t("validator.field-required")}
                      </span>
                    </div>
                    <div className="flex items-start lg:justify-start justify-center">
                      <button
                        type="submit"
                        className="px-[60px] py-[20px] mt-[30px] border hover:bg-white hover:text-[#3C3971]"
                      >
                        {t("button.send")}
                      </button>
                    </div>
                  </form>
                </div>

                <div className={toggleState === 2 ? "block" : "hidden"}>
                  <AppealCode />
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
