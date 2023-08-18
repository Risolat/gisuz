import React from "react";
import { useTranslation } from "next-i18next";
import styles from "../CallCenter/style.module.css";

const index = () => {
  const { t } = useTranslation("index");

  return (
    <div className="font-inter">
      <a href="tel:1144" className={styles.callCenter}>
        <div className={styles.socialMedia}>
          <div className={styles.tool}>{t("Index.navbar.phone")}</div>
          <div className={styles.frame3}>
            <svg
              className="murojat"
              width="28"
              height="29"
              viewBox="0 0 28 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.435 18.3034L19.4717 17.9651C18.76 17.8834 18.06 18.1284 17.5584 18.6301L15.4117 20.7767C12.11 19.0967 9.40338 16.4017 7.72338 13.0884L9.88171 10.9301C10.3834 10.4284 10.6284 9.72838 10.5467 9.01672L10.2084 6.07672C10.0684 4.89839 9.07671 4.01172 7.88671 4.01172H5.86838C4.55005 4.01172 3.45338 5.10839 3.53505 6.42672C4.15338 16.3901 12.1217 24.3467 22.0734 24.965C23.3917 25.0467 24.4884 23.9501 24.4884 22.6317V20.6134C24.5 19.4351 23.6134 18.4434 22.435 18.3034Z"
                fill="white"
              />
            </svg>

            <div className="font-inter font-medium text-[1.5rem] leading-6">
              1144
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default index;
