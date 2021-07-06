import React from "react";

import Style from "../styles/Header.module.scss";
import { HeaderButton } from "./Buttons/HeaderButton";

export const Header = () => {
  return (
    <header className={Style.Header}>
      <HeaderButton ButtonText={"HOME"} />
      <HeaderButton ButtonText={"AIRCRAFT SELECT"} />
      <HeaderButton ButtonText={"PLANNING"} />
      <HeaderButton ButtonText={"AIRCRAFT EDIT"} />
      <HeaderButton ButtonText={"AIRPORT EDIT"} />
    </header>
  );
};
