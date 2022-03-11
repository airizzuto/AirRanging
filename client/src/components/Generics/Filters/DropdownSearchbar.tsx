/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import AsyncSelect from 'react-select/async';

import { AircraftsFilterSearch, AircraftWithSocials } from '../../../types/Aircraft/Aircraft';
import { mapAircraftToFilter } from '../../../helpers/aircraftHelper';

import "./DropdownSearchbar.scss";

// TODO: generic implementation
interface Props {
  handleSelection: React.Dispatch<React.SetStateAction<any | null>>;
  handleFilter: (filter: AircraftsFilterSearch) => void;
  options: AircraftWithSocials[];
  filters: AircraftsFilterSearch;
  placeholder?: string;
}

/* React select documentation https://react-select.com/home */
const DropdownSearchbar: React.FC<Props> = ({
  handleSelection, handleFilter, filters, placeholder, options
}) => {

  const searchFilter = (inputValue: string) => {
    handleFilter({...filters, search: inputValue});

    console.debug("DEBUG: filtering search: ", options, filters);

    return mapAircraftToFilter(options);
  };

  const loadOptions = (
    inputValue: string,
    callback: (options: {value: AircraftWithSocials; label: string;}[]) => void,
  ) => {
    callback(searchFilter(inputValue));
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
        defaultOptions={mapAircraftToFilter(options)}
        loadOptions={loadOptions}
        onChange={(e) => handleChange(e?.value)}
        {...selectProps}
      />
    </>
  );
};

export default DropdownSearchbar;
