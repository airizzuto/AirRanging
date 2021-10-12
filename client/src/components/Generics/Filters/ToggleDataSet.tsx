import React from 'react';
import { AircraftsDataSets, Filters } from '../../../types/Aircraft/Filter';

import Style from "./ToggleDataSet.module.scss";
import CheckboxStyle from "../../../styles/components/_checkbox.module.scss";

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
    <div className={Style.Toggle}>
      <label htmlFor="checkboxToggle" className={CheckboxStyle.checkbox}>{label}
        <input
          id="checkboxToggle"
          type="checkbox"
          checked={isToggled}
          onChange={() => handleSetToggle()}
        />
        <span className={CheckboxStyle.checkmark}></span>
      </label>
    </div>
  );
};

export default ToggleDataSet;
