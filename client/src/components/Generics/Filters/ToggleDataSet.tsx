import React from 'react';
import { AircraftsDataSets, Filters } from '../../../types/Aircraft/Filter';

import Style from "./ToggleDataSet.module.scss";

interface Props {
  label: string;
  set: AircraftsDataSets;
  handleFilter: (filter: Filters) => void;
  filters: Filters;
}

const ToggleDataSet: React.FC<Props> = ({label, set, handleFilter, filters}) => {
  const isToggled = filters.set === set;

  const handleSetToggle = () => {
    console.log(`DEBUG: toggle set: ${set}, filter state: ${filters}`);
    isToggled
    ? handleFilter({...filters, set: "all"})
    : handleFilter({...filters, set: set});
  };

  return (
    <div className={Style.CheckboxItem}>
      <label>{label}</label>
      <input
        type="checkbox"
        checked={isToggled}
        onChange={() => handleSetToggle()}
      />
    </div>
  );
};

export default ToggleDataSet;
