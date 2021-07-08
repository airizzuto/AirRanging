import React from "react";
import { Link } from "react-router-dom";

import Style from "./Header.module.scss";
import Logo from "./LogoVector.svg";
import { HeaderButton } from "./HeaderButton";

const Header = (): JSX.Element => {
  return (
    <header className={Style.Header}>
      
      <div className={Style.HeaderLogo}>
        <Link to="/">
          <img src={Logo} alt="Logo" height="150" />
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
          <a>SignUp</a>
        </Link>
        
        <a href="#">Login</a>
      </div>
      
    </header>
  );
};

export default Header;
