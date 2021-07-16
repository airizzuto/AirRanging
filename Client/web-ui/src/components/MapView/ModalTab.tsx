import React from 'react';

import Style from "./Tabs.module.scss";

interface Props {
  label: string,
  handleTabClick: () => void
}

const ModalTab = ({label, handleTabClick}: Props): JSX.Element => {
  return (
      <button onClick={handleTabClick} className={Style.Tabs}>
        {label}
        <div className={Style.Arrow}>&#9658;</div>
      </button>
  )
}

export default ModalTab;
