import React from 'react'

interface Props {
  buttonText: string,
  handleClick: () => void
}

export default function Button({ buttonText, handleClick }: Props): JSX.Element {
  return (
    <button onClick={handleClick}>
      {buttonText}
    </button>
  );
}
