/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import AsyncSelect from 'react-select/async';

import { mapAircraftToFilter } from '../../../helpers/aircraftHelper';

import { AircraftWithSocials } from '../../../types/Aircraft/Aircraft';
import { Filters } from '../../../types/Aircraft/Filter';

import "./DropdownSearchbar.scss";

interface Props {
  handleSelection: React.Dispatch<React.SetStateAction<any | null>>;
  handleFilter: (filter: Filters) => void;
  initialOptions: AircraftWithSocials[];
  currentOptions: AircraftWithSocials[];
  filters: Filters;
  placeholder?: string;
}

/* React select documentation https://react-select.com/home */

const DropdownSearchbar: React.FC<Props> = ({
  handleSelection, handleFilter, initialOptions, currentOptions, filters, placeholder
}) => {

  const handleSearch = (inputValue: string) => {
    handleFilter({...filters, search: inputValue});
  };

  const handleChange = (selected: AircraftWithSocials | undefined) => {
    selected
    ? handleSelection(selected)
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
        placeholder={placeholder}
        cacheOptions
        defaultOptions={mapAircraftToFilter(initialOptions)}
        options={mapAircraftToFilter(currentOptions)}
        loadOptions={(inputValue) => handleSearch(inputValue)}
        onChange={e => handleChange(e?.value)}
        {...selectProps}
      />
    </>
  );
};

export default DropdownSearchbar;
