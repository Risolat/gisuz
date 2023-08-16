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
          className="social_button my-[15px] text-white hover:drop-shadow-[0_5px_30px_#3D8DFF]"
        >
          <Icon
            onMouseEnter={showTooltip1}
            onMouseLeave={removeTooltip1}
            className="text-#fff w-[30px] h-[30px] hover:text-[#3D8DFF] "
            icon="mdi:card-account-mail"
          />
        </Link>
        <p
          id="tooltip1"
          className="absolute w-full no-wrap text-center text-[12px] text-[#000] bg-gray-300 top-[28%] left-[10%]"
        ></p>

        <Link
          target="_blank"
          href="https://www.facebook.com/uzkomnazorat/"
          className="social_button my-[15px] bg_white text-white hover:drop-shadow-[0_5px_30px_#3D8DFF]"
        >
          <Icon
            onMouseEnter={showTooltip2}
            onMouseLeave={removeTooltip2}
            className="brand-icon hover:text-[#3D8DFF]"
            icon="brandico:facebook"
          />
        </Link>
        <p
          id="tooltip2"
          className="absolute w-full text-center text-[12px] text-[#000] bg-gray-300 top-[37%] left-[10%]"
        ></p>
        <Link
          target="_blank"
          href="https://www.instagram.com/uzkomnazorat/"
          className="social_button my-[15px] bg_white text-white hover:drop-shadow-[0_5px_30px_#3D8DFF]"
        >
          <Icon
            onMouseEnter={showTooltip3}
            onMouseLeave={removeTooltip3}
            className="brand-icon hover:text-[#3D8DFF]"
            icon="akar-icons:instagram-fill"
          />
        </Link>
        <p
          id="tooltip3"
          className="absolute w-full text-center text-[12px] text-[#000] bg-gray-300 top-[46%] left-[10%]"
        ></p>
        <Link
          target="_blank"
          href="https://t.me/gisuz"
          className="social_button my-[15px] bg_white text-white hover:drop-shadow-[0_5px_30px_#3D8DFF]"
        >
          <Icon
            onMouseEnter={showTooltip4}
            onMouseLeave={removeTooltip4}
            className="brand-icon hover:text-[#3D8DFF]"
            icon="bxl:telegram"
          />
        </Link>
        <p
          id="tooltip4"
          className="absolute w-full text-center text-[12px] text-[#000] bg-gray-300 top-[55%] left-[10%]"
        ></p>

        <Link
          target="_blank"
          href="https://www.youtube.com/channel/UC3ajfdl_uoWLGR1B-eCELWA"
          className="social_button my-[15px] bg_white text-white hover:drop-shadow-[0_5px_30px_#3D8DFF]"
        >
          <Icon
            onMouseEnter={showTooltip5}
            onMouseLeave={removeTooltip5}
            className="brand-icon hover:text-[#3D8DFF]"
            icon="bxl:youtube"
          />
        </Link>
        <p
          id="tooltip5"
          className="absolute w-full text-center text-[12px] text-[#000] bg-gray-300 top-[64%] left-[10%]"
        ></p>

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
