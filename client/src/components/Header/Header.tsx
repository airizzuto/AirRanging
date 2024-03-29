import { Link } from "react-router-dom";
import { UserPublic } from "../../types/User/User";

import { Button, LinkButton } from "../Generics/Buttons/Button";
import Menu from "../Menu/Menu";
import Logo from "../../assets/icons/LogoVector.svg";

import Style from "./Header.module.scss";

interface Props {
  handleLogout: () => void;
  user: UserPublic | null;
}

const Header = ({handleLogout, user}: Props): JSX.Element => (
  <nav className={Style.Container}>
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
        <LinkButton style={"primary"} path="/aircrafts">
          AIRCRAFTS
        </LinkButton>
      </li>
      <li>
        <LinkButton style={"primary"} path="/landmarks">
          LANDMARKS
        </LinkButton>
      </li>
    </ul>

    <div className={Style.HeaderAccount}>
      {!user
        ? <ul>
          <li>
            <LinkButton path="/login" style={"undecorated"}>
              LOGIN
            </LinkButton>
          </li>
          <li>
            <LinkButton path="/registration" style={"undecorated"}>
              SIGN UP
            </LinkButton>
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
