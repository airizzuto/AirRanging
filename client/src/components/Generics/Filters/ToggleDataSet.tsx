import React from 'react';
import { AircraftsDataSets, FilterSearch } from '../../../types/Aircraft/Filter';

import Style from "./ToggleDataSet.module.scss";
import CheckboxStyle from "../../../styles/components/_checkbox.module.scss";

interface Props {
  id: string;
  description: string;
  set: AircraftsDataSets;
  unset: AircraftsDataSets;
  handleFilter: (filter: FilterSearch) => void;
  filters: FilterSearch;
  disabled: boolean;
}

/**
 * Toggle for data set selection.
 * @param id
 * @param label
 * @param set
 * @param unset
 * @param handleFilter
 * @param filters
 * @param disabled
 * @returns React component
 */
const ToggleDataSet: React.FC<Props> = ({id, description, set, unset, handleFilter, filters, disabled}) => {
  const isToggled = filters.set === set;

  const handleSetToggle = () => {
    isToggled
    ? handleFilter({...filters, set: unset})
    : handleFilter({...filters, set: set});
  };

  return (
    <div className={Style.Toggle}>
      <label htmlFor={id} className={CheckboxStyle.checkbox}>{description}
        <input
          id={id}
          type="checkbox"
          checked={isToggled}
          onChange={() => handleSetToggle()}
          disabled={disabled}
        />
        <span className={CheckboxStyle.checkmark}></span>
      </label>
    </div>
  );
};

export default ToggleDataSet;
