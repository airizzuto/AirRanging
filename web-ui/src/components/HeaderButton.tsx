import React from "react";
import Style from "../styles/HeaderButton.module.scss";

interface Props {
  ButtonText: String,
  BackgroundImage: String,
}

export const HeaderButton = ({ButtonText, BackgroundImage}: Props) => {
  return (
    <div className={Style.HeaderButton} style={{backgroundImage: `${BackgroundImage}`}}>
      <button >{ButtonText}</button>
    </div>
  );
};
