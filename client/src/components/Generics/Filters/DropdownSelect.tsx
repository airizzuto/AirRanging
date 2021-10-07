import React from 'react';
import AsyncSelect from 'react-select/async';

import { AircraftWithSocials } from '../../../types/Aircraft/Aircraft';
import { AircraftSearchOptions } from '../../../types/Aircraft/AircraftEnums';
import { Filters } from '../../../types/Aircraft/Filter';

import "./Dropdown.scss";

interface Props {
  placeholder: string;
  filters: Filters;
  enumerator: typeof AircraftSearchOptions;
  handleFilter: (filter: Filters) => void;
}

const DropdownSelect: React.FC<Props> = ({placeholder, filters, enumerator, handleFilter}) => {

  const handleChange = (value: string | undefined) => {
    handleFilter({
      ...filters,
      field: AircraftSearchOptions[value as keyof typeof AircraftSearchOptions] as keyof AircraftWithSocials
    });
  };

  const selectProps = {
    isClearable: false,
    isDisabled: false,
    isLoading: false,
    isRtl: false,
    isSearchable: false,
  };

  return (
    <AsyncSelect
      className={"Dropdown-Container"}
      classNamePrefix={"Dropdown"}
      placeholder={placeholder}
      onChange={(e) => handleChange(e?.value)}
      cacheOptions
      defaultOptions={Object.keys(enumerator).map(key => ({
        label: key,
        value: key
      }))}
      {...selectProps}
    />
  );
};

export default DropdownSelect;
