import React from "react";
import { Link } from "react-router-dom";

import Style from "./Header.module.scss";
import Logo from "./LogoVector.svg";
import { HeaderButton } from "./HeaderButton";

const Header = (): JSX.Element => {
  return (
    <nav className={Style.Header}>

      <div className={Style.HeaderLogo}>
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
      </div>

      <ul className={Style.HeaderNav}>
        <li>
          <HeaderButton ButtonText={"AIRCRAFT SELECT"} />
        </li>
        <li>
          <HeaderButton ButtonText={"PLANNING"} />
        </li>
        <li>
          <Link to="/aircrafts">
            <HeaderButton ButtonText={"AIRCRAFT EDIT"} />
          </Link>
        </li>
        <li>
          <Link to="/">
            <HeaderButton ButtonText={"AIRPORT EDIT"} />
          </Link>
        </li>
      </ul>

      <div className={Style.HeaderAccount}>
        <ul>
          <li>
            <Link to="/sign">
              Sign Up
            </Link>
          </li>
          <li>
            <a href="#">Login</a>
          </li>
        </ul>
      </div>
      
    </nav>
  );
};

export default Header;
