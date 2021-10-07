import React from 'react';
import { AircraftsDataSets, Filters } from '../../../types/Aircraft/Filter';

import Style from "./ToggleDataSet.module.scss";

interface Props {
  label: string;
  set: AircraftsDataSets;
  handleFilter: (filter: Filters) => void;
  filters: Filters;
}

/**
 * Toggle for data set selection.
 * @param label
 * @param set
 * @param handleFilter
 * @param filters
 * @returns React component
 */
const ToggleDataSet: React.FC<Props> = ({label, set, handleFilter, filters}) => {
  const isToggled = filters.set === set;

  const handleSetToggle = () => {
    isToggled
    ? handleFilter({...filters, set: "all"})
    : handleFilter({...filters, set: set});
  };

  return (
    <div className={Style.Checkbox}>
      <label htmlFor="checkboxToggle">{label}</label>
      <input
        id="checkboxToggle"
        type="checkbox"
        checked={isToggled}
        onChange={() => handleSetToggle()}
      />
    </div>
  );
};

export default ToggleDataSet;
