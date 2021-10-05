/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import AsyncSelect from 'react-select/async';

import { mapAircraftToFilter } from '../../../helpers/aircraftHelper';

import { AircraftWithSocials } from '../../../types/Aircraft/Aircraft';
import { Filters } from '../../../types/Aircraft/Filter';

import "./DropdownSearchbar.scss";

interface Props {
  handleSelection: React.Dispatch<React.SetStateAction<any | null>>;
  handleFilter: (filter: Filters) => Promise<void>;
  initialOptions: AircraftWithSocials[];
  currentOptions: AircraftWithSocials[];
  filters: Filters;
}

/* React select documentation https://react-select.com/home */

const DropdownSearchbar: React.FC<Props> = ({
  handleSelection, handleFilter, initialOptions, currentOptions, filters
}) => {

  const handleSearch = (inputValue: string) => {
    handleFilter({...filters, search: inputValue});
  };

  const handleChange = (selected: any) => {
    selected
    ? handleSelection(selected.value)
    : handleSelection(null);
  };

  const selectProps = {
    isClearable: true,
    isDisabled: false,
    isLoading: false,
    isRtl: false,
    isSearchable: true,
  };

  return (
    <>
      <AsyncSelect
        className="Searchbar-Container"
        classNamePrefix="Searchbar"
        cacheOptions
        defaultOptions={mapAircraftToFilter(initialOptions)}
        options={mapAircraftToFilter(currentOptions)}
        loadOptions={(inputValue) => handleSearch(inputValue)}
        onChange={handleChange}
        {...selectProps}
      />
    </>
  );
};

export default DropdownSearchbar;
