import { CSSProperties } from 'react';

import Select from 'react-select';

const groupStyles: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const groupBadgeStyles: CSSProperties = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};

const DropdownFilter = ({options}: any) => {
  const formatGroupLabel = (data: any) => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

  return (
    <>
      <Select
        isSearchable={false}
        defaultValue={null}
        options={options}
        formatGroupLabel={formatGroupLabel}
      />
    </>
  );
};

export default DropdownFilter;
