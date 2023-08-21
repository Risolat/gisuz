import Link from "next/link";
import React from "react";
import { Icon } from "@iconify/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const index = () => {
  const { t } = useTranslation("common");
  const { locale } = useRouter();
  function showTooltip1() {
    const span = document.getElementById("tooltip1");
    span.innerHTML = t("page-titles.connect.hotline");
  }
  function removeTooltip1() {
    const span = document.getElementById("tooltip1");
    span.innerHTML = "";
  }
  function showTooltip2() {
    const span = document.getElementById("tooltip2");
    span.innerHTML = "facebook";
  }
  function removeTooltip2() {
    const span = document.getElementById("tooltip2");
    span.innerHTML = "";
  }
  function showTooltip3() {
    const span = document.getElementById("tooltip3");
    span.innerHTML = "instagram";
  }
  function removeTooltip3() {
    const span = document.getElementById("tooltip3");
    span.innerHTML = "";
  }
  function showTooltip4() {
    const span = document.getElementById("tooltip4");
    span.innerHTML = "telegram";
  }
  function removeTooltip4() {
    const span = document.getElementById("tooltip4");
    span.innerHTML = "";
  }
  function showTooltip5() {
    const span = document.getElementById("tooltip5");
    span.innerHTML = "youtube";
  }
  function removeTooltip5() {
    const span = document.getElementById("tooltip5");
    span.innerHTML = "";
  }
  return (
    <div className="fixed z-10 h-full mx-[40px] hidden 3xl:block">
      <div className="flex flex-col items-center h-full w-full">
        <span className="bg-white h-full w-[3px] my-[30px]"></span>
        <Link
          href="/connect/hotline"
          className="connect-btn-murojat block social_button my-[15px] text-white hover:drop-shadow-[0_5px_30px_#3D8DFF]"
        >
          <Icon
            className="block text-#fff w-[30px] h-[30px] hover:text-[#3D8DFF] "
            icon="mdi:card-account-mail"
          />
          <p
            id="tooltip1"
            className="absolute w-full text-center text-[12px] text-[#000] bg-gray-300 top-[28%] left-[10%]"
          >
            {t("page-titles.connect.hotline")}
          </p>
        </Link>

        <Link
          target="_blank"
          href="https://www.facebook.com/uzkomnazorat/"
          className="connect-btn-facebook block social_button my-[15px] bg_white text-white hover:drop-shadow-[0_5px_30px_#3D8DFF]"
        >
          <Icon
            className="brand-icon hover:text-[#3D8DFF]"
            icon="brandico:facebook"
          />
          <p
            id="tooltip2"
            className="absolute w-full text-center text-[12px] text-[#000] bg-gray-300 top-[37%] left-[10%]"
          >
            facebook
          </p>
        </Link>

        <Link
          target="_blank"
          href="https://www.instagram.com/uzkomnazorat/"
          className="connect-btn-instagram block social_button my-[15px] bg_white text-white hover:drop-shadow-[0_5px_30px_#3D8DFF]"
        >
          <Icon
            className="brand-icon hover:text-[#3D8DFF]"
            icon="akar-icons:instagram-fill"
          />
          <p
            id="tooltip3"
            className="absolute w-full text-center text-[12px] text-[#000] bg-gray-300 top-[46%] left-[10%]"
          >
            instagram
          </p>
        </Link>

        <Link
          target="_blank"
          href="https://t.me/gisuz"
          className="connect-btn-telegram block social_button my-[15px] bg_white text-white hover:drop-shadow-[0_5px_30px_#3D8DFF]"
        >
          <Icon
            className="brand-icon hover:text-[#3D8DFF]"
            icon="bxl:telegram"
          />
          <p
            id="tooltip4"
            className="absolute w-full text-center text-[12px] text-[#000] bg-gray-300 top-[55%] left-[10%]"
          >
            telegram
          </p>
        </Link>

        <Link
          target="_blank"
          href="https://www.youtube.com/channel/UC3ajfdl_uoWLGR1B-eCELWA"
          className="connect-btn-youtube social_button my-[15px] bg_white text-white hover:drop-shadow-[0_5px_30px_#3D8DFF]"
        >
          <Icon
            className="brand-icon hover:text-[#3D8DFF]"
            icon="bxl:youtube"
          />
          <p
            id="tooltip5"
            className="absolute w-full text-center text-[12px] text-[#000] bg-gray-300 top-[64%] left-[10%]"
          >
            youtube
          </p>
        </Link>

        <span className="!bg-white h-full w-[3px] my-[30px]"></span>
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
export default index;
