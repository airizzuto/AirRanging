
import Select from 'react-select';

import "./DropdownSearchbar.scss";

const DropdownOptions = (
  options: any,
  handleSelection: (e: React.ChangeEvent<HTMLInputElement>) => void,
) => {
  const settingsProps = {
    isClearable: false,
    isDisabled: false,
    isLoading: false,
    isRtl: false,
    isSearchable: false,
  };

  // TODO: handle selected filter, options groups
  return (
    <>
      <Select
        className="Searchbar-Container"
        classNamePrefix="Searchbar"
        defaultValue={options[0]}
        options={options}
        onChange={() => handleSelection}
        {...settingsProps}
      />
    </>
  );
};

export default DropdownOptions;
