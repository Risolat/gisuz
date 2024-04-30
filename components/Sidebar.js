import React, { useState, useEffect } from "react";
import axios from "../http";
import { useRouter } from "next/router";
import { Montserrat } from "next/font/google";
import Link from "next/link";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const Sidebar = () => {
  const { locale } = useRouter();
  const { pathname } = useRouter();
  const parts = pathname.split("/");
  const path = parts[1];
  console.log(path);
  const [ozcom, setozcom] = useState([]);
  const [activity, setactivity] = useState([]);
  const [infoService, setinfoService] = useState([]);
  const [interactive, setinteractive] = useState([]);
  const [documents, setdocuments] = useState([]);
  const [connect, setconnect] = useState([]);
  const [consumer, setconsumer] = useState([]);
  const [event, setevent] = useState([]);
  const [budget, setbudget] = useState([]);
  const [title, setTitle] = useState("");

  const getData = async () => {
    const response = await axios.get(`/${locale}/api/menu/`);
    console.log(response);
    const ozcom = ["OZCOM"];

    const ozcomMenu = response.data.filter((category) =>
      ozcom.includes(category.name)
    );
    setozcom(ozcomMenu[0].submenu);
    const activity = ["ACTIVITY"];
    const activityMenu = response.data.filter((category) =>
      activity.includes(category.name)
    );
    setactivity(activityMenu[0].submenu);
    const infoService = ["INFORMATION_SERVICE"];
    const infoServiceMenu = response.data.filter((category) =>
      infoService.includes(category.name)
    );
    setinfoService(infoServiceMenu[0].submenu);

    const interactive = ["INTERACTIVE_SERVICES"];
    const interactiveMenu = response.data.filter((category) =>
      interactive.includes(category.name)
    );
    setinteractive(interactiveMenu[0].submenu);
    const documents = ["DOCUMENTS"];
    const documentsMenu = response.data.filter((category) =>
      documents.includes(category.name)
    );
    setdocuments(documentsMenu[0].submenu);

    const network = ["NETWORK"];
    const networkMenu = response.data.filter((category) =>
      network.includes(category.name)
    );
    setconnect(networkMenu[0].submenu);

    const budget = ["Budjetijrosiochiqligi"];
    const budgetMenu = response.data.filter((category) =>
      budget.includes(category.name)
    );
    setbudget(budgetMenu[0].submenu);
    const events = ["EVENTS"];
    const eventsMenu = response.data.filter((category) =>
      events.includes(category.name)
    );
    setevent(eventsMenu[0].submenu);
    const consumer = ["REMIND"];
    const consumerMenu = response.data.filter((category) =>
      consumer.includes(category.name)
    );
    setconsumer(consumerMenu[0].submenu);

    if (path === "ozkomnazorat") {
      const ozcomTitle = ozcomMenu.map((d) => {
        return d.title;
      });
      setTitle(ozcomTitle);
    } else if (path === "activity") {
      const activityTitle = activityMenu.map((d) => {
        return d.title;
      });
      setTitle(activityTitle);
    } else if (path === "info_service") {
      const infoServiceTitle = infoServiceMenu.map((d) => {
        return d.title;
      });
      setTitle(infoServiceTitle);
    } else if (path === "interactive_service") {
      const interactiveTitle = interactiveMenu.map((d) => {
        return d.title;
      });
      setTitle(interactiveTitle);
    } else if (path === "documents") {
      const documentsTitle = documentsMenu.map((d) => {
        return d.title;
      });
      setTitle(documentsTitle);
    } else if (path === "connect") {
      const networkTitle = networkMenu.map((d) => {
        return d.title;
      });
      setTitle(networkTitle);
    } else if (path === "consumer_note") {
      const consumerTitle = consumerMenu.map((d) => {
        return d.title;
      });
      setTitle(consumerTitle);
    } else if (path === "events") {
      const eventsTitle = eventsMenu.map((d) => {
        return d.title;
      });
      setTitle(eventsTitle);
    } else {
      const budgetTitle = budgetMenu.map((d) => {
        return d.title;
      });
      setTitle(budgetTitle);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {path === "ozkomnazorat" ? (
        <div className="sticky top-[197px] 2xl:w-[350px] w-full 2xl:basis-1/4 basis-full mx-[20px] 2xl:mx-0  py-[8px] bg-[#3A2F7D]">
          <p
            className={`${montserrat.variable} font-montserrat font-semibold mb-[24px] text-[1.12rem] px-[16px]`}
          >
            {title}
          </p>
          <ul className="">
            {ozcom.map((item) => (
              <li key={item.id} className="bg-[#3A2F7D]">
                {item.slug === pathname ? (
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
      ) : path === "activity" ? (
        <div className="sticky top-[197px] 2xl:w-[350px] w-full 2xl:basis-1/4 basis-full mx-[20px] 2xl:mx-0  py-[8px] bg-[#3A2F7D]">
          <p
            className={`${montserrat.variable} font-montserrat font-semibold mb-[24px] text-[1.12rem] px-[16px]`}
          >
            {title}
          </p>
          <ul className="">
            {activity.map((item) => (
              <li key={item.id} className="bg-[#3A2F7D]">
                {item.slug === pathname ? (
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
      ) : path === "info_service" ? (
        <div className="sticky top-[197px] 2xl:w-[350px] w-full 2xl:basis-1/4 basis-full mx-[20px] 2xl:mx-0  py-[8px] bg-[#3A2F7D]">
          <p
            className={`${montserrat.variable} font-montserrat font-semibold mb-[24px] text-[1.12rem] px-[16px]`}
          >
            {title}
          </p>
          <ul className="">
            {infoService.map((item) => (
              <li key={item.id} className="bg-[#3A2F7D]">
                {item.slug === pathname ? (
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
      ) : path === "interactive_service" ? (
        <div className="sticky top-[197px] 2xl:w-[350px] w-full 2xl:basis-1/4 basis-full mx-[20px] 2xl:mx-0  py-[8px] bg-[#3A2F7D]">
          <p
            className={`${montserrat.variable} font-montserrat font-semibold mb-[24px] text-[1.12rem] px-[16px]`}
          >
            {title}
          </p>
          <ul className="">
            {interactive.map((item) => (
              <li key={item.id} className="bg-[#3A2F7D]">
                {item.slug === pathname ? (
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
      ) : path === "documents" ? (
        <div className="sticky top-[197px] 2xl:w-[350px] w-full 2xl:basis-1/4 basis-full mx-[20px] 2xl:mx-0  py-[8px] bg-[#3A2F7D]">
          <p
            className={`${montserrat.variable} font-montserrat font-semibold mb-[24px] text-[1.12rem] px-[16px]`}
          >
            {title}
          </p>
          <ul className="">
            {documents.map((item) => (
              <li key={item.id} className="bg-[#3A2F7D]">
                {item.slug === pathname ? (
                  <div className="gradientBox  bg-[#3A2F7D]">
                    <Link
                      className="block py-[10px] px-[16px] mx-[3px] hover:bg-[#24224E] bg-[#171142] text-white"
                      href={`${item.slug == null ? item.link : item.slug}`}
                      target={`${item.slug == null ? "__blank" : "_self"}`}
                    >
                      {item.title}
                    </Link>
                  </div>
                ) : (
                  <div className="gradientBox bg-[#3A2F7D]">
                    <Link
                      className="block py-[10px] px-[16px] hover:bg-[#24224E] hover:text-white bg-[#3A2F7D] text-[#A2A0B3]"
                      locale={locale}
                      href={`${item.slug == null ? item.link : item.slug}`}
                      target={`${item.slug == null ? "__blank" : "_self"}`}
                    >
                      {item.title}
                    </Link>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : path === "connect" ? (
        <div className="sticky top-[197px] 2xl:w-[350px] w-full 2xl:basis-1/4 basis-full mx-[20px] 2xl:mx-0  py-[8px] bg-[#3A2F7D]">
          <p
            className={`${montserrat.variable} font-montserrat font-semibold mb-[24px] text-[1.12rem] px-[16px]`}
          >
            {title}
          </p>
          <ul className="">
            {connect.map((item) => (
              <li key={item.id} className="bg-[#3A2F7D]">
                {item.slug === pathname ? (
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
      ) : path === "consumer_note" ? (
        <div className="sticky top-[197px] 2xl:w-[350px] w-full 2xl:basis-1/4 basis-full mx-[20px] 2xl:mx-0  py-[8px] bg-[#3A2F7D]">
          <p
            className={`${montserrat.variable} font-montserrat font-semibold mb-[24px] text-[1.12rem] px-[16px]`}
          >
            {title}
          </p>
          <ul className="">
            {consumer.map((item) => (
              <li key={item.id} className="bg-[#3A2F7D]">
                {item.slug === pathname ? (
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
      ) : path === "budget" ? (
        <div className="sticky top-[197px] 2xl:w-[350px] w-full 2xl:basis-1/4 basis-full mx-[20px] 2xl:mx-0  py-[8px] bg-[#3A2F7D]">
          <p
            className={`${montserrat.variable} font-montserrat font-semibold mb-[24px] text-[1.12rem] px-[16px]`}
          >
            {title}
          </p>
          <ul className="">
            {budget.map((item) => (
              <li key={item.id} className="bg-[#3A2F7D]">
                {item.slug === pathname ? (
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
      ) : path === "events" ? (
        <div className="sticky top-[197px] 2xl:w-[350px] w-full 2xl:basis-1/4 basis-full mx-[20px] 2xl:mx-0  py-[8px] bg-[#3A2F7D]">
          <p
            className={`${montserrat.variable} font-montserrat font-semibold mb-[24px] text-[1.12rem] px-[16px]`}
          >
            {title}
          </p>
          <ul className="">
            {event.map((item) => (
              <li key={item.id} className="bg-[#3A2F7D]">
                {item.slug === pathname ? (
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
      ) : (
        ""
      )}
    </div>
  );
};

export default Sidebar;
