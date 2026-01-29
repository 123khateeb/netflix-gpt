import React from "react";
import { Link } from "react-router-dom";
import header_image from "../assets/svg/logo.svg"
import "./Header.css";

const Header = () => {
  return (
    <header className="">
      <Link to="" className="header_logo_div">
        <img
          className="header_logo"
          src={header_image}
          alt="Netflix logo"
        />
      </Link>
    </header>
  );
};

export default Header;
