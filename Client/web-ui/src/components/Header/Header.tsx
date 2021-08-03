import { Link } from "react-router-dom";
import { UserInfo } from "../../types/User/User";

import Menu from "../Menu/Menu";

import Style from "./Header.module.scss";
import ButtonStyle from "../Buttons/ButtonStyles.module.scss";
import UndecoratedButton from "../Buttons/UndecoratedButton";
import Logo from "./LogoVector.svg";

interface Props {
  handleLogin: () => void;
  handleLogout: () => void;
  user: UserInfo | null;
}

const Header = ({handleLogin, handleLogout, user}: Props): JSX.Element => {


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
          <Link to="/aircrafts" className={ButtonStyle.Decorated}>
            AIRCRAFT EDIT
          </Link>
        </li>
        <li>
          <Link to="/airports" className={ButtonStyle.Decorated}>
            AIRPORT EDIT
          </Link>
        </li>
      </ul>

      <div className={Style.HeaderAccount}>
          {
            !user
            ? <ul>
                <li>
                  <UndecoratedButton text="LOGIN" onClick={handleLogin}/>
                </li>
                <li>
                  <Link to="/registration">
                    SIGN IN
                  </Link>
                </li>
              </ul>
            : <ul>
                <li>
                  {user.username}
                </li>
                <li>
                  <UndecoratedButton text="LOGOUT" onClick={handleLogout}/>
                </li>
              </ul>
          }
      </div>
    </nav>
  );
};

export default Header;
