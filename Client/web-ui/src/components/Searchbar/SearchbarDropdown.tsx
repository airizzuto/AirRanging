import React from 'react';
import AsyncSelect from 'react-select/async';

interface Props {
  defaultOptions: any;
  handleSelection: React.Dispatch<React.SetStateAction<any | null>>;
  handleFilter: (inputValue: string) => Promise<any>;
}

/* React select documentation https://react-select.com/home */

// TODO: make async and use aircraft/search  model
const SearchbarDropdown: React.FC<Props> = ({defaultOptions, handleSelection, handleFilter}) => {

  const promiseOptions = async (inputValue: string): Promise<readonly any[]> =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(handleFilter(inputValue));
      }, 1000);
  });

  const selectProps = {
    isClearable: true,
    isDisabled: false,
    isLoading: true,
    isRtl: false,
    isSearchable: true,
  };

  return (
    <>
      <AsyncSelect
        cacheOptions
        defaultOptions={defaultOptions}
        loadOptions={promiseOptions}
        onChange={handleSelection}
        {...selectProps}
      />
    </>
  );
};

export default SearchbarDropdown;
