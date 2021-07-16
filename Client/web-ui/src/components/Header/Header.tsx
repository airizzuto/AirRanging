import React from "react";
import { Link } from "react-router-dom";

import { HeaderButton } from "../Buttons/HeaderButton";
import Menu from "../Menu/Menu";

import Style from "./Header.module.scss";
import Logo from "./LogoVector.svg";

const Header = (): JSX.Element => {

  return (
    <nav className={Style.Header}>
      <div className={Style.Menu}>
        <Menu />
      </div>

      <div className={Style.HeaderLogo}>
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
      </div>

      <ul className={Style.HeaderNav}>
        <li>
          <Link to="/aircrafts">
            <HeaderButton ButtonText={"AIRCRAFT EDIT"} />
          </Link>
        </li>
        <li>
          <Link to="/airports">
            <HeaderButton ButtonText={"AIRPORT EDIT"} />
          </Link>
        </li>
      </ul>

      <div className={Style.HeaderAccount}>
        <ul>
          <li>
            <Link to="/sign">
              SIGN IN
            </Link>
          </li>
          <li>
            <a href="#">LOG IN</a>
          </li>
        </ul>
      </div>
      
    </nav>
  );
};

export default Header;
