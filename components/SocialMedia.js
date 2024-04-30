import React from "react";
import facebook from "../public/photos/icons/facebook.svg";
import instagram from "../public/photos/icons/instagram.svg";
import telegram from "../public/photos/icons/telegram.svg";
import youtube from "../public/photos/icons/youtube.svg";
import Link from "next/link";
import Image from "next/image";

const SocialMedia = () => {
  return (
    <div>
      <ul className="social-media overflow-scroll flex items-center border-[#5C587A] border-b-[1px] xl:border-none pl-2">
        <li className="social-media-item pr-[15px]">
          <Link
            href="https://www.facebook.com/uzkomnazorat/"
            target="_blank"
            title="facebook"
          >
            <Image src={facebook} alt="facebook" />
          </Link>
        </li>
        <li className="social-media-item pr-[15px]">
          <Link href="https://www.instagram.com/uzkomnazorat/" target="_blank">
            <Image src={instagram} alt="instagram" />
          </Link>
        </li>
        <li className="social-media-item pr-[15px]">
          <Link href="https://t.me/gisuz" target="_blank">
            <Image src={telegram} alt="telegram" />
          </Link>
        </li>
        <li className="social-media-item pr-[15px]">
          <Link
            href="https://www.youtube.com/channel/UC3ajfdl_uoWLGR1B-eCELWA"
            target="_blank"
          >
            <Image src={youtube} alt="youtube" />
          </Link>
        </li>
        <li className="text-[#A2A0B3] pr-[16px] hidden xl:inline-block">|</li>
      </ul>
    </div>
  );
};

export default SocialMedia;
