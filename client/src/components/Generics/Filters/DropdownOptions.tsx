// import { CSSProperties } from 'react';

import Select from 'react-select';
import { AircraftFields } from '../../../types/Aircraft/AircraftEnums';
import "./DropdownSearchbar.scss";

// const groupStyles: CSSProperties = {
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-between',
// };

// const groupBadgeStyles: CSSProperties = {
//   backgroundColor: '#EBECF0',
//   borderRadius: '2em',
//   color: '#172B4D',
//   display: 'inline-block',
//   fontSize: 12,
//   fontWeight: 'normal',
//   lineHeight: '1',
//   minWidth: 1,
//   padding: '0.16666666666667em 0.5em',
//   textAlign: 'center',
// };

const DropdownOptions = (
  {options}: any,
  placeholder: keyof AircraftFields,
  handleFieldSelection, // TODO:
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
        options={options}
        placeholder={placeholder.toString}
        onChange={handleFieldSelection}
        {...settingsProps}
      />
    </>
  );
};

export default DropdownOptions;
