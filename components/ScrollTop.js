import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const ScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setIsVisible(true);
    } else if (scrolled <= 300) {
      setIsVisible(false);
    }
  };
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  }, []);
  return (
    <div className="fixed bottom-0 right-0 bg-white w-[1px] h-[1px] anchorScrollButton">
      <button
        className={`${
          isVisible ? "fixed z-[991] bottom-5 right-5 block" : "hidden"
        }`}
        onClick={() => scrollToTop()}
      >
        <Icon
          className="text-[#A2A0B3]"
          icon="bi:arrow-up-circle-fill"
          width="40px"
        />
      </button>
    </div>
  );
};

export default ScrollTop;
