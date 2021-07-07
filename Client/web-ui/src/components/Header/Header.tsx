import React from "react";
import { Link } from "react-router-dom";

import Style from "./Header.module.scss";
import { HeaderButton } from "./HeaderButton";

const Header = () => {
  return (
    <header className={Style.Header}>
      
      <div className={Style.HeaderLogo}>
        <Link to="/">
          <img src="./LogoVector.svg" alt="Logo" height="150" />
        </Link>
      </div>

      <div className={Style.HeaderNav}>
        <HeaderButton ButtonText={"AIRCRAFT SELECT"} />

        <HeaderButton ButtonText={"PLANNING"} />

        <Link to="/aircrafts">
          <HeaderButton ButtonText={"AIRCRAFT EDIT"} />
        </Link>

        <Link to="/">
          <HeaderButton ButtonText={"AIRPORT EDIT"} />
        </Link>
      </div>

      <div className={Style.HeaderAccount}>
        <Link to="/sign">
          SIGNUP
        </Link>
      </div>
      
    </header>
  );
};

export default Header;
