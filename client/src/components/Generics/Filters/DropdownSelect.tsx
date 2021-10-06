import React from 'react';

import AsyncSelect from 'react-select/async';

import Style from "./Dropdown.module.scss";

interface Props {
  enumerator: any;
  handleChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DropdownSelect: React.FC<Props> = ({enumerator, handleChange}) => {
  const selectProps = {
    isClearable: false,
    isDisabled: false,
    isLoading: false,
    isRtl: false,
    isSearchable: false,
  };

  return (
    <AsyncSelect
      className={Style.Container}
      defaultOptions={Object.keys(enumerator)
        .map((key) => ({
          label: key,
          value: enumerator[key]
        }))
      }
      onChange={() => handleChange}
      {...selectProps}
    />
  );
};

export default DropdownSelect;
