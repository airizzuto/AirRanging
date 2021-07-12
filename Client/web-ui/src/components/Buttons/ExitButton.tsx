import React from "react";

import Style from "./ExitButton.module.scss"

interface Props {
  handleClick: any;
}

const ExitButton = ({handleClick}: Props) => {
  return (
    <div className={Style.ExitButton}>
      <button onClick={handleClick}>
        X
      </button>
    </div>
  );
};

export default ExitButton;
