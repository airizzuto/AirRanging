// import { CSSProperties } from 'react';

import Select from 'react-select';
import "./DropdownOptions.scss";

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

const DropdownOptions = ({options}: any) => {
  const formatGroupLabel = (data: any) => (
    <div className={"groupStyle"}>
      <span>{data.label}</span>
      <span className={"groupBadges"}>{data.options.length}</span>
    </div>
  );

  const settingsProps = {
    isClearable: true,
    isDisabled: false,
    isLoading: false,
    isRtl: false,
    isSearchable: false,
  };

  // TODO: handle selected filter, options groups
  return (
    <>
      <Select
        className="Dropdown-Container"
        classNamePrefix="Dropdown"
        defaultValue={null}
        options={options}
        formatGroupLabel={formatGroupLabel}
        {...settingsProps}
      />
    </>
  );
};

export default DropdownOptions;
