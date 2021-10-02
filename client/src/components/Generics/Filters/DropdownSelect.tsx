import React from 'react';
import EnumToOptions from './EnumToOptions';

import Style from "./Dropdown.module.scss";

interface Props {
  enumerator: any;
  handleChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

const DropdownSelect: React.FC<Props> = ({enumerator, handleChange}) => {
  return (
    <select onChange={() => handleChange} className={Style.Container}>
      <EnumToOptions
        enumerator={enumerator}
      />
    </select>
  );
};

export default DropdownSelect;
