import React from 'react';
import Select from "react-select";

import "./Dropdown.scss";

interface Props {
  name?: string;
  options: any;
  defaultValue?: any;
  placeholder?: string;
  handleSelect: (option: any) => void;
  isDisabled?: boolean;
}

const Dropdown: React.FC<Props> = ({
  name, options, defaultValue, placeholder, isDisabled, handleSelect
}) => {
  return (
    <>
      <Select
        name={name}
        options={options} 
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={(e) => handleSelect(e.value)}
        className={"Dropdown-container"}
        classNamePrefix={"Dropdown"}
        isDisabled={isDisabled}
      />
    </>
  );
};

export default Dropdown;
