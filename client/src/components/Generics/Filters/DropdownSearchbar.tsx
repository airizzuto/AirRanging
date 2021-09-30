/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import AsyncSelect from 'react-select/async';
import { mapAircraftToFilter } from '../../../helpers/aircraftHelper';
import { AircraftWithSocials } from '../../../types/Aircraft/Aircraft';

import "./DropdownSearchbar.scss";

interface Props {
  handleSelection: React.Dispatch<React.SetStateAction<any | null>>;
  handleFilter: (inputValue: string) => Promise<any>;
  defaultOptions: AircraftWithSocials[];
}

/* React select documentation https://react-select.com/home */

const DropdownSearchbar: React.FC<Props> = ({
  handleSelection, handleFilter, defaultOptions
}) => {

  const promiseOptions = async (inputValue: string): Promise<readonly any[]> =>
    new Promise(resolve => {
      setTimeout(async () => {
        resolve(handleFilter(inputValue)
          .then(response => mapAircraftToFilter(response))
        );
      }, 1000);
  });

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
        defaultOptions={mapAircraftToFilter(defaultOptions)}
        loadOptions={promiseOptions}
        onChange={handleChange}
        {...selectProps}
      />
    </>
  );
};

export default DropdownSearchbar;
