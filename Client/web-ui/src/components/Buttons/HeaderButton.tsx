import React from "react";
import Style from "../../styles/HeaderButton.module.scss";

interface Props {
  ButtonText: String,
  // BackgroundImage: String,
}

export const HeaderButton = ({ButtonText}: Props) => {
  return (
    <button className={Style.HeaderButton}>
      {ButtonText}
    </button>
  );
};
