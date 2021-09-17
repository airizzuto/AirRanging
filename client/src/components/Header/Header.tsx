import { Link } from "react-router-dom";
import { UserPublic } from "../../types/User/User";

import { Button, LinkButton } from "../Generics/Buttons/Button";
import Menu from "../Menu/Menu";

import Style from "./Header.module.scss";
import Logo from "./LogoVector.svg";

interface Props {
  handleLogout: () => void;
  user: UserPublic | null;
}

const Header = ({handleLogout, user}: Props): JSX.Element => (
  <nav className={Style.HeaderContainer}>
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
        <LinkButton buttonSettings= {{ style:"primary" }} path="/aircrafts">
          AIRCRAFTS
        </LinkButton>
      </li>
      <li>
        <LinkButton buttonSettings= {{ style:"primary" }} path="/airports">
          AIRPORTS
        </LinkButton>
      </li>
    </ul>

    <div className={Style.HeaderAccount}>
      {!user
        ? <ul>
          <li>
            <Link to="/login">
              LOGIN
            </Link>
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
            <span>{user?.username}</span>
          </li>
          <li>
            <Button handleClick={handleLogout} style={"undecorated"}>
              LOGOUT
            </Button>
          </li>
        </ul>}
    </div>
  </nav>
);

export default Header;
