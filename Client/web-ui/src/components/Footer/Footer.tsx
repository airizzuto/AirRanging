import React from "react";
import Style from "./Footer.module.scss";


const Footer = (): JSX.Element => {
  return (
    <div className={Style.Footer}>

      <div className={Style.Copyright}>
        Copyright
      </div>

      <div className={Style.Links}>
        <a href="/">Help</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
      </div>

    </div>
  );
};

export default Footer;
