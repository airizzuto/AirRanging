import React from "react";
import { Link } from "react-router-dom";

import Style from "../styles/Header.module.scss";
import { HeaderButton } from "./Buttons/HeaderButton";

export const HeaderHome = () => {
  return (
    <header className={Style.Header}>
      <Link to="/">
        <HeaderButton ButtonText={"HOME"} />
      </Link>

      <HeaderButton ButtonText={"AIRCRAFT SELECT"} />

      <HeaderButton ButtonText={"PLANNING"} />

      <Link to="/aircrafts">
        <HeaderButton ButtonText={"AIRCRAFT EDIT"} />
      </Link>

      <Link to="/">
        <HeaderButton ButtonText={"AIRPORT EDIT"} />
      </Link>
    </header>
  );
};
