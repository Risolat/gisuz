import React from "react";
import NavbarTop from "./NavbarTop";
import NavbarBottom from "./NavbarBottom";

const Navbar = () => {
  return (
    <nav className="sticky w-full top-0 z-20 navbar">
      <NavbarTop />
      <NavbarBottom />
    </nav>
  );
};
export default Navbar;
