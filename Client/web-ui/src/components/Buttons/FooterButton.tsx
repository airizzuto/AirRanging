import React from "react";
import Style from "../../styles/FooterButton.module.scss";

interface Props {
  ButtonText: String,
  // BackgroundImage: String,
}

export const FooterButton = ({ButtonText}: Props) => {
  return (
    <button className={Style.HeaderButton}>
      {ButtonText}
    </button>
  );
};
