import React from "react";
import { Link } from "react-router-dom";

import HeaderButton from "./HeaderButton";
import Button from "../Buttons/Button";
import Menu from "../Menu/Menu";

import Style from "./Header.module.scss";
import Logo from "./LogoVector.svg";

interface Props {
  loginHandler: () => void
}

const Header = ({loginHandler}: Props): JSX.Element => {

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
            <Button buttonText="Login" handleClick={loginHandler}/>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
