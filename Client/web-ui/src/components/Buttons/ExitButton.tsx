import React from "react";

import Style from "./ExitButton.module.scss"

interface Props {
  handleClick: () => void
}

const ExitButton = ({ handleClick }: Props): JSX.Element => {

  return (
    <div className={Style.ExitButton}>
      <button onClick={handleClick}>
        X
      </button>
    </div>
  );
};

export default ExitButton;
