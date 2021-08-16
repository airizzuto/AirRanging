/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import AsyncSelect from 'react-select/async';

import "./SearchbarDropdown.scss";

interface Props {
  handleSelection: React.Dispatch<React.SetStateAction<any | null>>;
  handleFilter: (inputValue: string) => Promise<any>;
}

/* React select documentation https://react-select.com/home */

const SearchbarDropdown: React.FC<Props> = ({
  handleSelection, handleFilter
}) => {

  const promiseOptions = async (inputValue: string): Promise<readonly any[]> =>
    new Promise(resolve => {
      setTimeout(async () => {
        resolve(handleFilter(inputValue));
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
        defaultOptions
        loadOptions={promiseOptions}
        onChange={handleChange}
        {...selectProps}
      />
    </>
  );
};

export default SearchbarDropdown;
