import { Link } from "react-router-dom";
import { UserPublic } from "../../types/User/User";

import Menu from "../Menu/Menu";
import LinkedButton from "../Buttons/LinkedButton";
import UndecoratedButton from "../Buttons/UndecoratedButton";

import Style from "./Header.module.scss";
import Logo from "./LogoVector.svg";

interface Props {
  handleLogin: () => void;
  handleLogout: () => void;
  user: UserPublic | null;
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
          <LinkedButton path="/aircrafts">
            AIRCRAFTS
          </LinkedButton>
        </li>
        <li>
          <LinkedButton path="/airports">
            AIRPORTS
          </LinkedButton>
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
                    SIGN UP
                  </Link>
                </li>
              </ul>
            : <ul>
                <li className={Style.UserDisplay}>
                  <label>
                    USER
                  </label>
                  <span>{user.username}</span>
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
