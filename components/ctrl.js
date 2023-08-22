import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Icon } from "@iconify/react";
import { useClickAway } from "@uidotdev/usehooks";
import axios from "../http";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Roboto } from "next/font/google";
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: "500",
});

const MySwal = withReactContent(Swal);
const ctrl = () => {
  const { t } = useTranslation("common");
  const { locale } = useRouter();
  const [site_text, setsite_text] = useState("");
  const [suggested_text, setsuggested_text] = useState("");
  const [open, setOpen] = useState(false);

  function getSelectionText() {
    let site_text = "";
    if (window.getSelection) {
      site_text = window.getSelection().toString();
      setsite_text(site_text);
      console.log(site_text);
    } else if (document.selection && document.selection.type != "Control") {
      site_text = document.selection.createRange().site_text;
      setsite_text(site_text);
    }
    return site_text;
  }
  const ref = useClickAway(() => {
    setOpen(!open);
  });
  const handleKeyDown = (event) => {
    if (
      (event.ctrlKey && event.keyCode === 13) ||
      (event.metaKey && event.keyCode === 13)
    ) {
      getSelectionText(site_text);
      setOpen(true);
    } else {
      console.log(event);
    }
  };
  const handleSuggested = (event) => {
    const suggested_text = event.target.value;
    console.log(suggested_text);
    setsuggested_text(event.target.value);
  };
  const onSubmit = async () => {
    const response = await axios.post(`/api/error_text/create/`, {
      site_text,
      suggested_text,
    });
    setOpen(false);
    MySwal.fire({
      color: "#A2A0B3",
      background: "#3A2F7D",
      fontFamily: "font-inter",
      timerProgressBar: true,
      icon: "success",
      title: (
        <p className={`${roboto.variable} font-roboto`}>
          {t("modal.appeal-applied")}
        </p>
      ),
      timer: 5500,
      showConfirmButton: false,
      customClass: {
        timerProgressBar: "swal_timerProgressBar",
        popup: "swal_popup",
      },
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", MySwal.stopTimer);
        toast.addEventListener("mouseleave", MySwal.resumeTimer);
      },
    });
    //   MySwal.fire({
    //     color: "#A2A0B3",
    //     background: "#3A2F7D",
    //     timerProgressBar: true,
    //     icon: "error",
    //     title: $t("modal.appeal-not-applied"),
    //     timer: 5500,
    //     showConfirmButton: false,
    //     customClass: {
    //       timerProgressBar: "swal_timerProgressBar",
    //       popup: "swal_popup",
    //     },
    //     didOpen: (toast) => {
    //       toast.addEventListener("mouseenter", MySwal.stopTimer);
    //       toast.addEventListener("mouseleave", MySwal.resumeTimer);
    //     },
    //   });
    //   console.log(e);
    // }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
  }, []);
  return (
    <div>
      {open ? (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-30 w-full h-full bg-gray-800 bg-opacity-80">
          <div className="modal fixed top-[30%] left-0 bottom-0 right-0 w-screen h-screen  z-30 ml-[20px]">
            <div className="w-screen h-screen ">
              <div className="relative w-[500px] p-[20px]  pt-[30px] my-0  mx-auto flex items-start bg-[#171142]">
                <div className="w-full">
                  <form
                    // onSubmit={onSubmit}
                    className="flex flex-col items-center justify-center"
                  >
                    <label className="w-full">
                      <p className="pb-[10px]">{t("modal.selected-text")}</p>
                      <input
                        className="w-full py-[13px] mb-[20px] px-[50px] border-slate-200 placeholder-slate-400 px-[8px] bg-[#3A2F7D] contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
                        type="text"
                        value={site_text}
                        disabled
                        name="site_text"
                      />
                    </label>
                    <label className="w-full">
                      <p className="pb-[10px]">{t("modal.correct-text")}</p>
                      <input
                        type="text"
                        className="w-full py-[13px] mb-[20px] px-[50px] border-slate-200 placeholder-slate-400 px-[8px] bg-[#3A2F7D] contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
                        onChange={(event) => handleSuggested(event)}
                        name="suggested_text"
                      />
                    </label>
                    <div className="flex mt-[40px]">
                      <button
                        className="px-[30px] py-[12px] border border-white font-inter font-medium text-[1em] hover:bg-white text-white hover:text-[#171142]"
                        type="button"
                        onClick={onSubmit}
                      >
                        {t("button.send")}
                      </button>
                    </div>
                  </form>
                </div>
                <button className="absolute right-[2%] top-[3%]" type="submit">
                  <Icon
                    icon="mdi:clear-circle-outline"
                    color="#a2a0b3"
                    width="25"
                    height="25"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
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
export default ctrl;
