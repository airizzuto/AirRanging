import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import Style from "./Footer.module.scss";


const Footer = (): JSX.Element => {
  return (
    <footer className={Style.Footer}>

      <div className={Style.Copyright}>
        <FontAwesomeIcon icon={faCopyright} id="faCopyright"/> AIRIZZUTO - 2021
      </div>

      <div className={Style.Links}>
        <a href="/">Help</a>
        <a href="/">About</a>
        <Link to="/contact">
          Contact
        </Link>
      </div>

    </footer>
  );
};

export default Footer;
