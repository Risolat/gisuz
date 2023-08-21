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

  console.log(errors, "errors");

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
  const [selectRegion, setselectRegion] = useState();
  const [title, setTitle] = useState();
  const [submenu, setSubmenu] = useState([]);
  const [appeal, setappeal] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [regionId, setRegionId] = useState();
  const [districtName, setDistrictName] = useState("");
  const [district, setdistrict] = useState("");
  const [districtOpen, setDistrictOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState({});
  const [randomText, setRandomText] = useState("");
  const [capcha, setcapcha] = useState("");
  const [captcha_is_correct, setcaptcha_is_correct] = useState(false);
  const toggleTab = (index) => {
    setToggleState(index);
  };

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
    console.log(district);
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
    getData();
    getregions();
    makeId();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="flex flex-row items-start py-[40px]">
          <div className="basis-3/4 px-[20px]">
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
                        <p>Murojaatingiz qabul qilindi</p>
                        <div className="flex items-center">
                          <p>Murojaat kodi:</p> <span>{code_request}</span>
                          <p>Tekshiruv kodi:</p> <span>{code_password}</span>
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
                    <div className=" mr-[30px] pb-[30px]">
                      <div className="flex items-center justify-between pb-[40px]">
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
                                <p className="w-[480px] h-[40px] px-[10px] pt-[8px]">
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
                                    className="px-[20px] py-[8px] text-[#A2A0B3]"
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
                                <p className="w-[480px] h-[40px] px-[10px] pt-[8px]">
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
                                    className="px-[20px] py-[8px] text-[#A2A0B3]"
                                  >
                                    {r.name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pb-[40px]">
                        <label className="block">
                          <p className="text-[18px] pb-[10px]">
                            {t("form.full-name")}
                          </p>
                          <input
                            type="text"
                            name="full_name"
                            className="w-[500px] border-slate-200 placeholder-slate-400 px-[8px] py-[10px] bg-[#3A2F7D] contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
                            {...register("full_name", { required: true })}
                          />
                          <span className="text-[red]">
                            {errors.name?.type === "required" &&
                              "Name is required"}
                          </span>
                        </label>
                        <label className="block">
                          <p className="text-[18px] pb-[10px]">
                            {t("form.address")}
                          </p>
                          <input
                            type="text"
                            name="address"
                            className="w-[500px] border-slate-200 placeholder-slate-400 px-[8px] py-[10px] bg-[#3A2F7D] contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
                            {...register("address", { required: true })}
                          />
                          <span className="text-[red]">
                            {errors.name?.type === "required" &&
                              "Name is required"}
                          </span>
                        </label>
                      </div>
                      <div className="flex items-center justify-between pb-[40px]">
                        <div>
                          <p className="text-[18px] pb-[10px]">
                            {t("form.email")}
                          </p>
                          <label className="block">
                            <input
                              type="email"
                              name="email"
                              className="border-slate-200 placeholder-slate-400 px-[8px] py-[10px] w-[500px] bg-[#3A2F7D] contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
                              {...register("email", {
                                required: true,
                                pattern:
                                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                              })}
                            />
                            <span className="text-[red]">
                              {errors.email?.type === "required" &&
                                "Email is required"}
                              {errors.email?.type === "pattern" &&
                                "Entered email is in wrong format"}
                            </span>
                          </label>
                        </div>
                        <div>
                          <label className="block">
                            <p className="text-[18px] pb-[10px]">
                              {t("form.phone")}
                            </p>
                            <input
                              type="text"
                              name="phone"
                              placeholder=""
                              // value={phone}
                              onChange={() => setValue(phone)}
                              className="border-slate-200 placeholder-slate-400 px-[8px] py-[10px] w-[500px] bg-[#3A2F7D] contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
                              {...register("phone", { required: true })}
                            />
                            <span className="text-[red]">
                              {errors.phone?.type === "required" &&
                                "Phone is required"}
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-[18px] pb-[10px]">
                            {t("form.message-text")}
                          </p>
                          <label className="flex flex-col mr-[20px]">
                            <input
                              type="text"
                              name="text"
                              placeholder=""
                              onChange={() => setValue(text)}
                              className="border-slate-200 placeholder-slate-400 px-[8px] py-[10px] w-[500px] h-[180px] bg-[#3A2F7D] contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
                              {...register("text", { required: true })}
                            />
                            <span className="text-[red]">
                              {errors.text?.type === "required" &&
                                "Name is required"}
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
                              className="flex items-center justify-between w-[500px] h-[70px] px-[10px]  cursor-pointer bg-[#3A2F7D]"
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
                                onChange={(e) => setValue(e.target.files[0])}
                                {...register("file", { required: true })}
                              />
                              {/* <span className="text-[red]">
                                {errors.file?.type === "required" &&
                                  "File is required"}
                              </span> */}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-end">
                      <div className="flex">
                        <div className="flex">
                          <label className="flex">
                            <input
                              type="text"
                              onChange={(event) => handleCapcha(event)}
                              name="captcha_is_correct"
                              className="border-slate-200 placeholder-slate-400 px-[8px] py-[10px] w-[370px] bg-[#3A2F7D] contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
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
                    </div>
                    <button
                      type="submit"
                      className="px-[60px] py-[20px] mt-[30px] border hover:bg-white hover:text-[#3C3971]"
                    >
                      {t("button.send")}
                    </button>
                  </form>
                </div>

                <div className={toggleState === 2 ? "block" : "hidden"}>
                  <AppealCode />
                </div>
              </div>
            </div>
          </div>
          <div className="sticky top-[197px] w-[350px] basis-1/4 py-[8px] bg-[#3A2F7D]">
            <p className="mb-[24px] text-[20px] px-[16px]">{title}</p>
            <ul className="">
              {submenu.map((item) => (
                <li key={item.id} className="bg-[#3A2F7D]">
                  {item.slug === "/interactive_service/appeal" ? (
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
