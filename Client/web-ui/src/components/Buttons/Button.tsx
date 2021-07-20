import React from 'react'
import Style from "./ButtonStyles.module.scss"

interface Props {
  buttonText: string,
  handleClick?: () => void
}

export default function Button({ buttonText, handleClick }: Props): JSX.Element {
  return (
    <div className={Style.Undecorated}>
      <a onClick={handleClick}>
        {buttonText}
      </a>
    </div>
  );
}
