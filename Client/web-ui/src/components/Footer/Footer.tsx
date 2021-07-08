import React from "react";
import Style from "./Footer.module.scss";


const Footer = (): JSX.Element => {
  return (
    <div className={Style.Footer}>
      <a href="/">Help</a>
      <a href="/">About</a>
      <a href="/">Contact</a>
    </div>
  );
};

export default Footer;
