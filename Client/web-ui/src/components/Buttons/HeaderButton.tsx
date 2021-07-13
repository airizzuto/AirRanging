import React from "react";
import Style from "./HeaderButton.module.scss";

interface Props {
  ButtonText: string,
  // BackgroundImage: String,
}

export const HeaderButton = ({ButtonText}: Props): JSX.Element => {
  return (
    <div className={Style.HeaderButton}>
      {ButtonText}
    </div>
  );
};
