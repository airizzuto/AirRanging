import React from 'react';
import AsyncSelect from 'react-select/async';
import { LandmarkSearchOptions, LandmarksFilterSearch, LandmarkWithSocials } from '../../../types/Landmark/Landmark';


import "./Dropdown.scss";

interface Props {
  placeholder: string;
  filters: LandmarksFilterSearch;
  enumerator: typeof LandmarkSearchOptions;
  handleFilter: (filter: LandmarksFilterSearch) => void;
}

const DropdownAircraftOptions: React.FC<Props> = ({placeholder, filters, enumerator, handleFilter}) => {

  const handleChange = (value: string | undefined) => {
    handleFilter({
      ...filters,
      searchField: LandmarkSearchOptions[value as keyof typeof LandmarkSearchOptions] as keyof LandmarkWithSocials
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

export default DropdownAircraftOptions;
