import { Link } from "react-router-dom";

import Menu from "../Menu/Menu";

import Style from "./Header.module.scss";
import ButtonStyle from "../Buttons/ButtonStyles.module.scss";
import Logo from "./LogoVector.svg";
import UndecoratedButton from "../Buttons/UndecoratedButton";

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
          <Link to="/aircrafts" className={ButtonStyle.PrimaryButton}>
            AIRCRAFT EDIT
          </Link>
        </li>
        <li>
          <Link to="/airports" className={ButtonStyle.PrimaryButton}>
            AIRPORT EDIT
          </Link>
        </li>
      </ul>

      <div className={Style.HeaderAccount}>
        <ul>
          <li>
            <Link to="/registration">
              SIGN IN
            </Link>
          </li>
          <li>
            <UndecoratedButton text="LOGIN" onClick={loginHandler}/>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
