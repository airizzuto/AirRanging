import React from 'react'
import Style from "./Button.module.scss"

interface Props {
  buttonText: string,
  handleClick: () => void
}

export default function Button({ buttonText, handleClick }: Props): JSX.Element {
  return (
    <a onClick={handleClick} className={Style.Button}>
      {buttonText}
    </a>
  );
}
